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
  name?: string;
};

export type Profile = {
  name: string;
  defaultPhoneNumberId?: string | null;
  email?: string;
};

export function useProfile() {
  const t = useTranslations('Profile');
  const apollo = useApolloClient();

  // Query using custom useQuery hook
  const { data, error, loading, refetch } = useQuery<FindTenantProfileQuery>(
    FindTenantProfileDocument,
  );

  const profile = data?.getTenantById;

  /** Field validators */
  const phoneRegex = /^[+\d().\-\s]{6,20}$/;
  const validators = {
    phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => v ?? '')
      .refine((v) => v === '' || phoneRegex.test(v), {
        message: t('invalidPhone'),
      }),
    name: z
      .string()
      .trim()
      .min(2, { message: t('ownerNameTooShort') })
      .max(100, { message: t('ownerNameTooLong') }),
  };

  /** Generic updater using Apollo mutate + optimistic update */
  const updateField = async (patch: Partial<Profile>) => {
    if (!profile) return;

    // Email is not updatable, so it is kept out of the mutation input
    const { email: _email, ...input } = patch;
    const optimistic = { ...profile, ...patch };

    try {
      await apollo.mutate<
        UpdateTenantProfileMutation,
        UpdateTenantProfileMutationVariables
      >({
        mutation: UpdateTenantProfileDocument,
        variables: { input },
        optimisticResponse: { updateTenant: optimistic },
        update(cache, { data: resp }) {
          const serverResponse = resp?.updateTenant;
          const next = serverResponse
            ? { ...serverResponse, email: profile.email || '' }
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

  /** Validates and saves several profile fields in a single request */
  const updateProfile = async (patch: ProfilePatch) => {
    const next: Partial<Profile> = {};

    if (patch.name !== undefined) {
      const r = validators.name.safeParse(patch.name);
      if (!r.success) {
        return {
          success: false,
          error: r.error.issues[0]?.message || t('unknownError'),
        };
      }
      next.name = r.data;
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
      updatePhone,
      updateProfile,
      mutate: refetch, // still exposed if we need to force a refresh
    },
  };
}

export default useProfile;
