'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useQuery, useApolloClient } from '@apollo/client/react';
import {
  FindTenantProfileDocument,
  FindTenantProfileQuery,
  UpdateTenantProfileDocument,
  UpdateTenantProfileMutation,
  UpdateTenantProfileMutationVariables,
} from '@graphql/generated';

export type ProfilePatch = {
  ownerName?: string;
  businessName?: string;
  domain?: string;
  description?: string;
  logo?: string | null;
};

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

export function useProfile() {
  const t = useTranslations('Profile');
  const apollo = useApolloClient();

  // Query using custom useQuery hook
  const { data, error, loading, refetch } = useQuery<FindTenantProfileQuery>(
    FindTenantProfileDocument,
  );

  const profile = data?.getTenantById;

  const isValidDomain = (value: string) => {
    try {
      const hostname = new URL(`https://${value}`).hostname;

      return hostname === value && hostname.includes('.');
    } catch (_error) {
      return false;
    }
  };

  /** Field validators */
  const phoneRegex = /^[+\d().\-\s]{6,20}$/;
  const validators = {
    domain: z.string().refine(isValidDomain, { message: t('invalidDomain') }),
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
      .refine((val) => val.trim() === '' || val.trim().length >= 20, {
        message: t('descriptionTooShort'),
      })
      .refine((val) => val.length <= 2000, {
        message: t('descriptionTooLong'),
      }),
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
    } catch (_e) {}
  };

  /** Actions */
  const updateDomain = async (next: string) => {
    const parsed = validators.domain.safeParse(next);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      await updateField({ domain: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('domainUpdated'),
      });
      return { success: true };
    } catch (_e) {}
  };

  const updatePhone = async (next: string) => {
    const parsed = validators.phone.safeParse(next);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const value = parsed.data.trim() === '' ? null : parsed.data;
      await updateField({ defaultPhoneNumberId: value });
      toast.success(t('savedChangesTitle'), { description: t('phoneUpdated') });
      return { success: true };
    } catch (_e) {}
  };

  const updateEmail = async (next: string) => {
    const parsed = validators.email.safeParse(next);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      await updateField({ email: parsed.data });
      toast.success(t('savedChangesTitle'), { description: t('emailUpdated') });
      return { success: true };
    } catch (_e) {}
  };

  const updateDescription = async (next: string) => {
    const parsed = validators.description.safeParse(next);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const value = parsed.data.trim() === '' ? null : parsed.data;
      await updateField({ description: value });
      // Only show success toast if there's actual content
      if (value !== null) {
        toast.success(t('savedChangesTitle'), {
          description: t('descriptionUpdated'),
        });
      }
      return { success: true };
    } catch (_e) {}
  };

  const updateBusinessName = async (next: string) => {
    const parsed = validators.businessName.safeParse(next);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      await updateField({ businessName: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('businessNameUpdated'),
      });
      return { success: true };
    } catch (_e) {}
  };

  const updateOwnerName = async (next: string) => {
    const parsed = validators.ownerName.safeParse(next);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      await updateField({ ownerName: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('ownerNameUpdated'),
      });
      return { success: true };
    } catch (_e) {}
  };

  const updateLogo = async (url: string | null) => {
    const parsed = validators.logo.safeParse(url);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      await updateField({ logo: parsed.data });
      toast.success(t('savedChangesTitle'), { description: t('logoUpdated') });
      return { success: true };
    } catch (_e) {}
  };

  /** Validates and saves several profile fields in a single request */
  const updateProfile = async (patch: ProfilePatch) => {
    const checks: Array<[boolean, string | undefined]> = [];
    const next: Partial<Profile> = {};

    if (patch.ownerName !== undefined) {
      const r = validators.ownerName.safeParse(patch.ownerName);
      checks.push([r.success, r.error?.issues[0]?.message]);
      if (r.success) next.ownerName = r.data;
    }
    if (patch.businessName !== undefined) {
      const r = validators.businessName.safeParse(patch.businessName);
      checks.push([r.success, r.error?.issues[0]?.message]);
      if (r.success) next.businessName = r.data;
    }
    if (patch.domain !== undefined) {
      const r = validators.domain.safeParse(patch.domain);
      checks.push([r.success, r.error?.issues[0]?.message]);
      if (r.success) next.domain = r.data;
    }
    if (patch.description !== undefined) {
      const r = validators.description.safeParse(patch.description);
      checks.push([r.success, r.error?.issues[0]?.message]);
      if (r.success) next.description = r.data.trim() === '' ? null : r.data;
    }
    if (patch.logo !== undefined) {
      const r = validators.logo.safeParse(patch.logo);
      checks.push([r.success, r.error?.issues[0]?.message]);
      if (r.success) next.logo = r.data;
    }

    const failed = checks.find(([ok]) => !ok);
    if (failed) {
      return { success: false, error: failed[1] || t('unknownError') };
    }

    await updateField(next);
    toast.success(t('savedChangesTitle'), {
      description: t('profileUpdated'),
    });
    return { success: true };
  };

  /** Phone derived values */
  const rawPhone = (profile?.defaultPhoneNumberId ?? '').trim();
  const hasPhone = rawPhone.length > 0;
  const phoneDisplay = hasPhone ? rawPhone : t('noPhone');
  const phoneActionLabel = hasPhone ? t('change') : t('add');

  return {
    profile,
    error,
    loading,
    hasPhone,
    phoneDisplay,
    phoneActionLabel,
    validators,
    actions: {
      updateDomain,
      updatePhone,
      updateEmail,
      updateDescription,
      updateBusinessName,
      updateOwnerName,
      updateLogo,
      updateProfile,
      mutate: refetch, // still exposed if we need to force a refresh
    },
  };
}

export default useProfile;
