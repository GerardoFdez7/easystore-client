'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Hook: initialize a Driver.js tour only once per browser.
// Behavior:
// - Use a per-browser storage key so the tour is shown strictly once in this
//   browser. This keeps logic simple and avoids coupling with profile fetching.
// - Use translations from the `Dashboard` namespace.
export default function useDriverTour() {
  const t = useTranslations('Dashboard');

  useEffect(() => {
    // Run only on client and only if the tour hasn't been seen in this browser.
    if (typeof window === 'undefined') return;

    const storageKey = 'easystore:dashboardTourSeen_v1';

    try {
      if (localStorage.getItem(storageKey)) return; // already seen for this browser
    } catch (_e) {
      // localStorage unavailable: do not block UI, but don't persist.
    }

    let driverInstance: unknown = null;
    let cancelled = false;

    const startTour = async () => {
      try {
        // Dynamically import the installed package
        const mod: unknown = await import('driver.js');
        const driverFactory =
          (mod as { driver?: unknown }).driver ??
          (mod as { default?: unknown }).default ??
          mod;
        if (!driverFactory) return;

        if (cancelled) return;

        // Tour steps — targets use data-tour selectors. Translations via next-intl.
        const steps = [
          {
            element: '[data-tour="welcome"]',
            popover: {
              title: t('tour.welcome.title'),
              description: t('tour.welcome.description'),
            },
          },
          {
            element: '[data-tour="kpi-cards"]',
            popover: {
              title: t('tour.kpis.title'),
              description: t('tour.kpis.description'),
            },
          },
          {
            element: '[data-tour="chart-total-sales"]',
            popover: {
              title: t('tour.totalSales.title'),
              description: t('tour.totalSales.description'),
            },
          },
          {
            element: '[data-tour="sales-overview"]',
            popover: {
              title: t('tour.orders.title'),
              description: t('tour.orders.description'),
            },
          },
          {
            element: '[data-tour="top-products"]',
            popover: {
              title: t('tour.topProducts.title'),
              description: t('tour.topProducts.description'),
            },
          },
          {
            element: '[data-tour="customer-satisfaction"]',
            popover: {
              title: t('tour.satisfaction.title'),
              description: t('tour.satisfaction.description'),
            },
          },
          {
            element: '[data-tour="reviews"]',
            popover: {
              title: t('tour.reviews.title'),
              description: t('tour.reviews.description'),
            },
          },
        ];

        // Create instance with animation and options
        // API v1: driver({ showProgress, steps }) -> driverObj.drive()
        let driverObj: unknown | null = null;
        if (typeof driverFactory === 'function') {
          driverObj = (driverFactory as (...args: unknown[]) => unknown)({
            showProgress: true,
            steps,
          });
        } else if (
          driverFactory &&
          typeof (driverFactory as { driver?: unknown }).driver === 'function'
        ) {
          driverObj = (
            driverFactory as { driver: (...args: unknown[]) => unknown }
          ).driver({ showProgress: true, steps });
        }

        if (!driverObj) return;

        driverInstance = driverObj;

        // Mark as seen when the tour completes — attempt multiple signals
        const markSeen = () => {
          try {
            localStorage.setItem(storageKey, '1');
          } catch (_e) {
            /* ignore */
          }
        };

        // Start the tour
        if (typeof (driverObj as { drive?: unknown }).drive === 'function') {
          (driverObj as { drive: (...args: unknown[]) => unknown }).drive();
        } else if (
          typeof (driverObj as { start?: unknown }).start === 'function'
        ) {
          // compatibility with older API
          (driverObj as { start: (...args: unknown[]) => unknown }).start();
        }

        // The v1 API exposes `on` on the instance; register possible handlers
        if (
          driverObj &&
          typeof (driverObj as { on?: unknown }).on === 'function'
        ) {
          try {
            (driverObj as { on: (...args: unknown[]) => unknown }).on(
              'complete',
              markSeen,
            );
            (driverObj as { on: (...args: unknown[]) => unknown }).on(
              'destroy',
              markSeen,
            );
            (driverObj as { on: (...args: unknown[]) => unknown }).on(
              'stop',
              markSeen,
            );
          } catch (_e) {
            // ignore
          }
        } else {
          // fallback: mark after 5 minutes to avoid repeating indefinitely
          setTimeout(markSeen, 1000 * 60 * 5);
        }
      } catch (_err) {
        // do not block if it fails
      }
    };

    // start with a small delay so the UI has mounted
    const timer = window.setTimeout(() => {
      void startTour().catch(() => {
        /* ignore */
      });
    }, 600);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      try {
        if (
          driverInstance &&
          typeof (driverInstance as { reset?: unknown }).reset === 'function'
        )
          (
            driverInstance as { reset: (...args: unknown[]) => unknown }
          ).reset();
        if (
          driverInstance &&
          typeof (driverInstance as { destroy?: unknown }).destroy ===
            'function'
        )
          (
            driverInstance as { destroy: (...args: unknown[]) => unknown }
          ).destroy();
      } catch (_e) {
        /* ignore */
      }
    };
  }, [t]);
}
