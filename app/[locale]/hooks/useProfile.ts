'use client';

import { gql, NetworkStatus, useApolloClient } from '@apollo/client';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useGraphQL } from '@hooks/useGraphQL';

export type Profile = {
  id: string;
  domain: string | null;
  phone: string | null;
  email: string | null;
  emailVerified: boolean;
  logoUrl: string | null;
  description: string | null;
  storeName: string | null;
  plan?: string | null;
  passwordChangedAgo?: string | null;
};

/** GraphQL documents (DocumentNode, no casts) */
const GetProfileDocument = gql`
  query GetProfile($tenantId: ID) {
    profile(tenantId: $tenantId) {
      id
      domain
      phone
      email
      emailVerified
      logoUrl
      description
      storeName
      plan
      passwordChangedAgo
    }
  }
`;

const UpdateProfileDocument = gql`
  mutation UpdateProfile($tenantId: ID, $input: ProfileInput!) {
    updateProfile(tenantId: $tenantId, input: $input) {
      id
      domain
      phone
      email
      emailVerified
      logoUrl
      description
      storeName
      plan
      passwordChangedAgo
    }
  }
`;

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

export function useProfile(tenantId?: string) {
  const t = useTranslations('Profile');
  const apollo = useApolloClient();

  // Query
  const { data, error, isLoading, networkStatus, refetch } = useGraphQL<{
    profile: Profile;
  }>(GetProfileDocument, {
    tenantId: tenantId ?? null,
  });

  const isValidating =
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.setVariables;

  const profile = data?.profile;

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
    storeName: z
      .string()
      .trim()
      .min(2, { message: t('storeNameTooShort') })
      .max(100, { message: t('storeNameTooLong') }),
    logoUrl: z.string().url({ message: t('invalidUrl') }),
  };

  /** Generic updater using Apollo mutate + optimistic update */
  const updateField = async (patch: Partial<Profile>) => {
    if (!profile) return;

    const optimistic: Profile = { ...profile, ...patch };

    try {
      await apollo.mutate<
        { updateProfile: Profile },
        { tenantId?: string | null; input: Partial<Profile> }
      >({
        mutation: UpdateProfileDocument,
        variables: { tenantId: tenantId ?? null, input: patch },
        optimisticResponse: { updateProfile: optimistic },
        update(cache, { data: resp }) {
          const next = resp?.updateProfile ?? optimistic;
          cache.writeQuery({
            query: GetProfileDocument,
            variables: { tenantId: tenantId ?? null },
            data: { profile: next },
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
    await updateField({ phone: value });
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

  const updateStoreName = async (next: string) => {
    const parsed = validators.storeName.safeParse(next);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ storeName: parsed.data });
    toast.success(t('savedChangesTitle'), {
      description: t('storeNameUpdated'),
    });
    return true;
  };

  const updateLogoUrl = async (url: string) => {
    const parsed = validators.logoUrl.safeParse(url);
    if (!parsed.success) {
      toast.error(t('submitErrorTitle'), {
        description: parsed.error.issues[0]?.message,
      });
      return false;
    }
    await updateField({ logoUrl: parsed.data });
    toast.success(t('savedChangesTitle'), { description: t('logoUpdated') });
    return true;
  };

  const updateLogoFromFile = async (file: File) => {
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads/logo', {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      await updateLogoUrl(url);
      return true;
    } catch (e: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: errorToMessage(e, t('unknownError')),
      });
      return false;
    }
  };

  /** Phone derived values */
  const rawPhone = (profile?.phone ?? '').trim();
  const hasPhone = rawPhone.length > 0;
  const phoneDisplay = hasPhone ? rawPhone : t('noPhone');
  const phoneActionLabel = hasPhone ? t('change') : t('add');

  return {
    profile,
    error,
    isLoading,
    isValidating,
    hasPhone,
    phoneDisplay,
    phoneActionLabel,
    actions: {
      updateDomain,
      updatePhone,
      updateEmail,
      updateDescription,
      updateStoreName,
      updateLogoUrl,
      updateLogoFromFile,
      mutate: refetch, // still exposed if you want to force a refresh
    },
  };
}

export default useProfile;
