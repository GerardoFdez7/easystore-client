'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useUnsavedChangesToast } from '@hooks/utils/useUnsavedChangesToast';
import { useTranslations } from 'next-intl';
import {
  useProfile,
  type ProfilePatch,
} from '@hooks/domains/tenant/useProfile';
import type { FindTenantProfileQuery } from '@graphql/generated';

type Profile = FindTenantProfileQuery['getTenantById'];

type DraftValues = {
  ownerName: string;
  businessName: string;
  domain: string;
  description: string;
  logo: string | null;
};

interface ProfileDraftContextType {
  profile: Profile | undefined;
  loading: boolean;
  /** Current value of each field: the pending edit, or the saved value. */
  values: DraftValues;
  setField: <K extends keyof DraftValues>(
    key: K,
    value: DraftValues[K],
  ) => void;
  /** Incremented on cancel so uncontrolled children (the logo uploader) reset. */
  resetKey: number;
}

const ProfileDraftContext = createContext<ProfileDraftContextType | undefined>(
  undefined,
);

const savedValues = (profile: Profile | undefined): DraftValues => ({
  ownerName: profile?.ownerName ?? '',
  businessName: profile?.businessName ?? '',
  domain: profile?.domain ?? '',
  description: profile?.description ?? '',
  logo: profile?.logo ?? null,
});

export const ProfileDraftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const t = useTranslations('Profile');
  const { profile, loading, actions } = useProfile();
  const [overrides, setOverrides] = useState<Partial<DraftValues>>({});
  const [resetKey, setResetKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);

  const saved = useMemo(() => savedValues(profile), [profile]);
  const values = useMemo(
    () => ({ ...saved, ...overrides }),
    [saved, overrides],
  );

  const patch = useMemo(() => {
    const changed: ProfilePatch = {};
    (Object.keys(overrides) as Array<keyof DraftValues>).forEach((key) => {
      if (overrides[key] !== saved[key]) {
        Object.assign(changed, { [key]: overrides[key] });
      }
    });
    return changed;
  }, [overrides, saved]);
  const dirty = Object.keys(patch).length > 0;

  const setField = useCallback<ProfileDraftContextType['setField']>(
    (key, value) => setOverrides((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const cancel = useCallback(() => {
    setOverrides({});
    setResetKey((k) => k + 1);
  }, []);

  const save = useCallback(async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    try {
      const result = await actions.updateProfile(patch);
      if (result.success) {
        setOverrides({});
      } else {
        toast.error(t('submitErrorTitle'), {
          description: result.error ?? t('unknownError'),
        });
      }
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [actions, patch, t]);

  useUnsavedChangesToast({
    id: 'profile-unsaved-changes',
    isDirty: dirty,
    isSaving: saving,
    message: t('unsavedChanges'),
    saveLabel: t('save'),
    cancelLabel: t('cancel'),
    onSave: () => void save(),
    onCancel: cancel,
  });

  const context = useMemo(
    () => ({ profile, loading, values, setField, resetKey }),
    [profile, loading, values, setField, resetKey],
  );

  return (
    <ProfileDraftContext.Provider value={context}>
      {children}
    </ProfileDraftContext.Provider>
  );
};

export const useProfileDraft = (): ProfileDraftContextType => {
  const context = useContext(ProfileDraftContext);
  if (!context) {
    throw new Error(
      'useProfileDraft must be used within a ProfileDraftProvider',
    );
  }
  return context;
};
