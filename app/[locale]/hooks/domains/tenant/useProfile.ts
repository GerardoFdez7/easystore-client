'use client';

import { useApolloClient } from '@apollo/client';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import useQuery from '@hooks/useQuery';
import {
  FindTenantProfileDocument,
  FindTenantProfileQuery,
  UpdateTenantProfileDocument,
  UpdateTenantProfileMutation,
  UpdateTenantProfileMutationVariables,
} from '@lib/graphql/generated';

export type Profile = {
  ownerName: string;
  businessName: string;
  description?: string | null;
  domain: string;
  logo?: string | null;
  defaultPhoneNumberId?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  plan?: string | null;
};

/** Extract a human readable error message */
function pickMessage(body: unknown): string | undefined {
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object') {
    const obj = body as Record<string, unknown>;
    for (const key of ['message', 'error', 'detail']) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) return v;
    }
  }
  return undefined;
}

function errorToMessage(e: unknown, fallback: string): string {
  if (e instanceof Error) return e.message || fallback;
  return pickMessage(e) ?? (typeof e === 'string' ? e : fallback);
}

export function useProfile() {
  const t = useTranslations('Profile');
  const apollo = useApolloClient();

  // Query using custom useQuery hook
  const { data, errors, isLoading, refetch } = useQuery<FindTenantProfileQuery>(
    FindTenantProfileDocument,
  );

  const profile = data?.getTenantById;

  /** Field validators */
  const phoneRegex = /^[+\d().\-\s]{6,20}$/;
  const validators = {
    domain: z
      .string()
      .trim()
      .min(3, { message: t('domainTooShort') })
      .max(255, { message: t('domainTooLong') })
      .refine((v) => !/\s/.test(v), { message: t('noSpacesAllowed') }),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => v ?? '')
      .refine((v) => v === '' || phoneRegex.test(v), {
        message: t('invalidPhone'),
      }),
    email: z
      .string()
      .trim()
      .email({ message: t('invalidEmailFormat') }),
    description: z
      .string()
      .trim()
      .max(2000, { message: t('descriptionTooLong') }),
    businessName: z
      .string()
      .trim()
      .min(2, { message: t('businessNameTooShort') })
      .max(100, { message: t('businessNameTooLong') }),
    ownerName: z
      .string()
      .trim()
      .min(2, { message: t('ownerNameTooShort') })
      .max(100, { message: t('ownerNameTooLong') }),
    logo: z
      .union([z.string(), z.null()])
      .refine(
        (val) => {
          // Allow null or empty string for logo removal
          if (val === null || val === '') return true;
          // Otherwise, validate as URL
          return z.string().url().safeParse(val).success;
        },
        {
          message: t('invalidUrl'),
        },
      )
      .optional(),
  };

  /** Generic updater using Apollo mutate + optimistic update */
  const updateField = async (patch: Partial<Profile>) => {
    if (!profile) return;

    // Create optimistic response excluding email (not updatable)
    const { email: _email, ...profileWithoutEmail } = profile;
    const optimistic = {
      ...profileWithoutEmail,
      ...patch,
      // Re-add email from original profile since it's not updatable
      email: profile.email || '',
    };

    try {
      await apollo.mutate<
        UpdateTenantProfileMutation,
        UpdateTenantProfileMutationVariables
      >({
        mutation: UpdateTenantProfileDocument,
        variables: { input: patch },
        optimisticResponse: { updateTenant: optimistic },
        update(cache, { data: resp }) {
          const serverResponse = resp?.updateTenant;
          const next = serverResponse
            ? {
                ...serverResponse,
                // Ensure email is preserved from original profile
                email: profile.email || '',
              }
            : optimistic;
          cache.writeQuery({
            query: FindTenantProfileDocument,
            data: { getTenantById: next },
          });
        },
      });
    } catch (e: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: errorToMessage(e, t('unknownError')),
      });
      throw e;
    }
  };

  /** Actions */
  const updateDomain = async (next: string) => {
    const parsed = validators.domain.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ domain: parsed.data });
    toast.success(t('savedChangesTitle'), { description: t('domainUpdated') });
    return true;
  };

  const updatePhone = async (next: string) => {
    const parsed = validators.phone.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    const value = parsed.data.trim() === '' ? null : parsed.data;
    await updateField({ defaultPhoneNumberId: value });
    toast.success(t('savedChangesTitle'), { description: t('phoneUpdated') });
    return true;
  };

  const updateEmail = async (next: string) => {
    const parsed = validators.email.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ email: parsed.data });
    toast.success(t('savedChangesTitle'), { description: t('emailUpdated') });
    return true;
  };

  const updateDescription = async (next: string) => {
    const parsed = validators.description.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ description: parsed.data });
    toast.success(t('savedChangesTitle'), {
      description: t('descriptionUpdated'),
    });
    return true;
  };

  const updateBusinessName = async (next: string) => {
    const parsed = validators.businessName.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ businessName: parsed.data });
    toast.success(t('savedChangesTitle'), {
      description: t('businessNameUpdated'),
    });
    return true;
  };

  const updateOwnerName = async (next: string) => {
    const parsed = validators.ownerName.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ ownerName: parsed.data });
    toast.success(t('savedChangesTitle'), {
      description: t('ownerNameUpdated'),
    });
    return true;
  };

  const updateLogo = async (url: string | null) => {
    const parsed = validators.logo.safeParse(url);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ logo: parsed.data });
    toast.success(t('savedChangesTitle'), { description: t('logoUpdated') });
    return true;
  };

  /** Phone derived values */
  const rawPhone = (profile?.defaultPhoneNumberId ?? '').trim();
  const hasPhone = rawPhone.length > 0;
  const phoneDisplay = hasPhone ? rawPhone : t('noPhone');
  const phoneActionLabel = hasPhone ? t('change') : t('add');

  return {
    profile,
    errors,
    isLoading,
    hasPhone,
    phoneDisplay,
    phoneActionLabel,
    actions: {
      updateDomain,
      updatePhone,
      updateEmail,
      updateDescription,
      updateBusinessName,
      updateOwnerName,
      updateLogo,
      mutate: refetch, // still exposed if you want to force a refresh
    },
  };
}

export default useProfile;
