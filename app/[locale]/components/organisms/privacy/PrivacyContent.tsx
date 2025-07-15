'use client';

import { TableOfContents } from '@molecules/shared/TableOfContents';
import { ContentSection } from '@molecules/shared/ContentSection';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';

type SectionData = { id: string; titleKey: string; bodyKeys: string[] };

export function PrivacyContent() {
  const t = useTranslations('Privacy');
  const [activeId, setActiveId] = useState<string>('');

  const sections = useMemo<SectionData[]>(
    () => [
      { id: 'intro', titleKey: 'introTitle', bodyKeys: ['introP1', 'introP2'] },
      {
        id: 'values',
        titleKey: 'valuesTitle',
        bodyKeys: ['valuesP1', 'valuesP2'],
      },
      { id: 'why', titleKey: 'whyTitle', bodyKeys: ['whyP1'] },
      { id: 'where', titleKey: 'whereTitle', bodyKeys: ['whereP1'] },
      { id: 'howLong', titleKey: 'howLongTitle', bodyKeys: ['howLongP1'] },
      {
        id: 'protect',
        titleKey: 'protectTitle',
        bodyKeys: ['protectP1', 'protectP2'],
      },
      {
        id: 'cookies',
        titleKey: 'cookiesTitle',
        bodyKeys: ['cookiesP1', 'cookiesP2'],
      },
      { id: 'contact', titleKey: 'contactTitle', bodyKeys: ['contactP1'] },
    ],
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="container mx-auto px-6 pt-32 pb-16">
      <div className="mt-4 mb-12 rounded-md bg-gray-800 px-8 py-12 text-white">
        <h1 className="text-center text-3xl font-bold">{t('pageTitle')}</h1>
      </div>

      <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-[250px_1fr] lg:items-start lg:gap-x-32">
        <aside className="mb-8 w-full max-w-md lg:sticky lg:top-32 lg:mb-0">
          <TableOfContents
            className="mx-auto w-full sm:w-80"
            items={sections.map((s, i) => ({
              id: s.id,
              label: `${i + 1}. ${t(s.titleKey)}`,
            }))}
            activeId={activeId}
          />
        </aside>

        <div className="w-full max-w-2xl">
          {sections.map((s, i) => (
            <ContentSection
              key={s.id}
              id={s.id}
              title={`${i + 1}. ${t(s.titleKey)}`}
              className="pt-8"
            >
              {s.bodyKeys.map((bk) => (
                <p key={bk} className="mb-6 leading-relaxed text-gray-700">
                  {t(bk)}
                </p>
              ))}
            </ContentSection>
          ))}
        </div>
      </div>
    </main>
  );
}
