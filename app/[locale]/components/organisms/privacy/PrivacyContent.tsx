// components/organisms/PrivacyContent.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { TableOfContents } from '@molecules/shared/TableOfContents';
import { ContentSection } from '@molecules/shared/ContentSection';

type SectionData = { id: string; titleKey: string; bodyKeys: string[] };

const RichText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] | null = null;

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    const isBullet = line.startsWith('•');

    if (isBullet) {
      if (!currentList) {
        currentList = [];
      }
      currentList.push(
        <li key={`li-${idx}`} className="mb-1">
          {line.replace(/^•\s*/, '')}
        </li>,
      );
    } else {
      if (currentList) {
        elements.push(
          <ul
            key={`ul-${idx}`}
            className="text-text mb-4 list-disc space-y-1 pl-6"
          >
            {currentList}
          </ul>,
        );
        currentList = null;
      }
      if (line === '') return;
      elements.push(
        <p
          key={`p-${idx}`}
          className="text-text mb-4 leading-relaxed whitespace-pre-line"
        >
          {rawLine}
        </p>,
      );
    }
  });

  if (currentList) {
    elements.push(
      <ul key="ul-final" className="text-text mb-4 list-disc space-y-1 pl-6">
        {currentList}
      </ul>,
    );
  }

  return <>{elements}</>;
};

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
      { id: 'protect', titleKey: 'protectTitle', bodyKeys: ['protectP1'] },
      { id: 'cookies', titleKey: 'cookiesTitle', bodyKeys: ['cookiesP1'] },
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
      <div className="bg-foreground text-accent mt-4 mb-12 rounded-md px-8 py-12">
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
                <RichText key={bk} text={t(bk)} />
              ))}
            </ContentSection>
          ))}
        </div>
      </div>
    </main>
  );
}
