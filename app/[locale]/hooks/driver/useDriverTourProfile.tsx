'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Browser-global storage key to remember that the profile tour was seen
const storageKey = 'easystore:profileTourSeen_v1';

export default function useDriverTourProfile() {
  const t = useTranslations('Profile');

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    try {
      const seen = localStorage.getItem(storageKey);
      if (seen) return; // already seen, do nothing
    } catch (_e) {
      // ignore localStorage errors
      return;
    }
    // Minimal runtime shape for the driver.js instance that we use.
    type DriverType = {
      defineSteps: (steps: unknown) => void;
      start: () => void;
      on: (event: string, cb: (...args: unknown[]) => void) => void;
      destroy?: () => void;
    };

    let driverInstance: DriverType | null = null;
    let fallbackId: number | undefined;

    const run = async () => {
      try {
        // dynamic import of driver.js
        const mod = (await import('driver.js')) as unknown;

        // Resolve constructor from ESM default or commonjs export and cast to a
        // constructor that returns the minimal DriverType.
        const modUnknown = mod as unknown;
        const ctorCandidate =
          (modUnknown as { default?: unknown }).default ?? modUnknown;

        const DriverConstructor = ctorCandidate as unknown as new (
          opts: Record<string, unknown>,
        ) => DriverType;

        driverInstance = new DriverConstructor({
          opacity: 0.55,
          padding: 10,
          animate: true,
          doneBtnText: t('tour.done') || 'Done',
          closeBtnText: t('tour.close') || 'Close',
          nextBtnText: t('tour.next') || 'Next',
          prevBtnText: t('tour.prev') || 'Prev',
        });

        const steps = [
          {
            element: '[data-tour="profile-logo"]',
            popover: {
              title: t('tour.logoTitle') || 'Store logo',
              description:
                t('tour.logoDesc') ||
                'Upload a logo to represent your store here.',
            },
          },
          {
            element: '[data-tour="profile-business-name"]',
            popover: {
              title: t('tour.businessNameTitle') || 'Business name',
              description:
                t('tour.businessNameDesc') ||
                'This is your public store name. You can edit it directly.',
            },
          },
          {
            element: '[data-tour="profile-description"]',
            popover: {
              title: t('tour.descriptionTitle') || 'Store description',
              description:
                t('tour.descriptionDesc') ||
                'Add a short description to tell customers about your store.',
            },
          },
          {
            element: '[data-tour="profile-owner-name"]',
            popover: {
              title: t('tour.ownerNameTitle') || 'Owner name',
              description:
                t('tour.ownerNameDesc') || 'The store owner contact name.',
            },
          },
          {
            element: '[data-tour="profile-domain"]',
            popover: {
              title: t('tour.domainTitle') || 'Domain',
              description:
                t('tour.domainDesc') ||
                'Your store domain or custom domain setting.',
            },
          },
          {
            element: '[data-tour="profile-email"]',
            popover: {
              title: t('tour.emailTitle') || 'Contact email',
              description:
                t('tour.emailDesc') ||
                'Primary email for notifications and account recovery.',
            },
          },
          {
            element: '[data-tour="profile-password"]',
            popover: {
              title: t('tour.passwordTitle') || 'Password',
              description:
                t('tour.passwordDesc') || 'Change your account password here.',
            },
          },
          {
            element: '[data-tour="profile-plan"]',
            popover: {
              title: t('tour.planTitle') || 'Plan',
              description:
                t('tour.planDesc') ||
                'View or change your current subscription plan.',
            },
          },
          {
            element: '[data-tour="profile-logout"]',
            popover: {
              title: t('tour.logoutTitle') || 'Logout',
              description:
                t('tour.logoutDesc') || 'Sign out from your account.',
            },
          },
        ];

        driverInstance.defineSteps(steps as unknown);
        driverInstance.start();

        const markSeen = () => {
          try {
            localStorage.setItem(storageKey, '1');
          } catch (_e) {}
        };

        // attach events
        driverInstance.on('complete', markSeen);
        driverInstance.on('destroy', markSeen);
        driverInstance.on('stop', markSeen);

        // safety: mark seen after 5 minutes to avoid stuck tours
        const timeoutMs = 5 * 60 * 1000;
        fallbackId = window.setTimeout(markSeen, timeoutMs);
      } catch (_err) {
        // driver import failed or something else; ignore silently
      }
    };

    // call and intentionally ignore promise (lint rule handled by using void)
    void run();

    // cleanup on unmount
    return () => {
      try {
        if (typeof fallbackId !== 'undefined') {
          clearTimeout(fallbackId);
        }
      } catch (_e) {}
      try {
        driverInstance?.destroy?.();
      } catch (_e) {}
    };
  }, [t]);
}
