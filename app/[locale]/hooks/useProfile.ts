'use client';

import useSWR from 'swr';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

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

export function useProfile(tenantId?: string) {
  const t = useTranslations('Profile');

  // Endpoint
  const key = tenantId ? `/api/tenants/${tenantId}/profile` : `/api/profile`;

  const { data, error, isLoading, mutate, isValidating } = useSWR<Profile>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

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

  // ── PATCH  ─────────────────────────────────
  const patch = async (patchObj: Partial<Profile>) => {
    const res = await fetch(key, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchObj),
    });
    if (!res.ok) {
      let body: unknown;
      try {
        body = await res.json();
      } catch {}
      const msg = pickMessage(body) ?? `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return (await res.json().catch(() => null)) as Profile | null;
  };

  const updateField = async (patchObj: Partial<Profile>) => {
    const next = { ...(data as Profile), ...patchObj };
    await mutate(
      async () => {
        const updated = await patch(patchObj);
        return updated ?? next;
      },
      {
        optimisticData: next,
        rollbackOnError: true,
        revalidate: false,
        populateCache: true,
      },
    );
  };

  // ── Actions by field ─────────────────────────────────
  const updateDomain = async (next: string) => {
    const parsed = validators.domain.safeParse(next);
    if (!parsed.success)
      return (
        toast.error(t('submitErrorTitle'), {
          description: parsed.error.issues[0]?.message,
        }),
        false
      );
    try {
      await updateField({ domain: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('domainUpdated'),
      });
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  const updatePhone = async (next: string) => {
    const parsed = validators.phone.safeParse(next);
    if (!parsed.success)
      return (
        toast.error(t('submitErrorTitle'), {
          description: parsed.error.issues[0]?.message,
        }),
        false
      );
    const value = parsed.data.trim() === '' ? null : parsed.data;
    try {
      await updateField({ phone: value });
      toast.success(t('savedChangesTitle'), { description: t('phoneUpdated') });
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  const updateEmail = async (next: string) => {
    const parsed = validators.email.safeParse(next);
    if (!parsed.success)
      return (
        toast.error(t('submitErrorTitle'), {
          description: parsed.error.issues[0]?.message,
        }),
        false
      );
    try {
      await updateField({ email: parsed.data });
      toast.success(t('savedChangesTitle'), { description: t('emailUpdated') });
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  const updateDescription = async (next: string) => {
    const parsed = validators.description.safeParse(next);
    if (!parsed.success)
      return (
        toast.error(t('submitErrorTitle'), {
          description: parsed.error.issues[0]?.message,
        }),
        false
      );
    try {
      await updateField({ description: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('descriptionUpdated'),
      });
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  const updateStoreName = async (next: string) => {
    const parsed = validators.storeName.safeParse(next);
    if (!parsed.success)
      return (
        toast.error(t('submitErrorTitle'), {
          description: parsed.error.issues[0]?.message,
        }),
        false
      );
    try {
      await updateField({ storeName: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('storeNameUpdated'),
      });
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  // ── LOGO ─────────────────────────────────
  /** Case A:  URL (CDN / S3 presigned / etc.) */
  const updateLogoUrl = async (url: string) => {
    const parsed = validators.logoUrl.safeParse(url);
    if (!parsed.success)
      return (
        toast.error(t('submitErrorTitle'), {
          description: parsed.error.issues[0]?.message,
        }),
        false
      );
    try {
      await updateField({ logoUrl: parsed.data });
      toast.success(t('savedChangesTitle'), { description: t('logoUpdated') });
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  /** Case B: upload file to API  */
  const updateLogoFromFile = async (file: File) => {
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${key}/logo`, { method: 'POST', body: form });
      if (!res.ok) {
        let body: unknown;
        try {
          body = await res.json();
        } catch {}
        throw new Error(pickMessage(body) ?? `HTTP ${res.status}`);
      }
      const { url } = (await res.json()) as { url: string };
      await updateLogoUrl(url);
      return true;
    } catch (err: unknown) {
      toast.error(t('submitErrorTitle'), {
        description: err instanceof Error ? err.message : t('unknownError'),
      });
      return false;
    }
  };

  const phoneDisplay = data?.phone ?? t('noPhone');
  const phoneActionLabel = data?.phone ? t('change') : t('add');

  return {
    profile: data,
    error,
    isLoading,
    isValidating,
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
      mutate,
    },
  };
}

export default useProfile;
