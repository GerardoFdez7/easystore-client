'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ContentSection } from '@molecules/shared/ContentSection';
import { TableOfContents } from '@molecules/shared/TableOfContents';
import type { LegalContentProps } from '@lib/types/legal-content';

function LegalRichText({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let currentList: ReactNode[] | null = null;

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (line.startsWith('•')) {
      currentList ??= [];
      currentList.push(
        <li key={`li-${index}`} className="mb-1">
          {line.replace(/^•\s*/, '')}
        </li>,
      );
      return;
    }

    if (currentList) {
      elements.push(
        <ul
          key={`ul-${index}`}
          className="text-text mb-4 list-disc space-y-1 pl-6"
        >
          {currentList}
        </ul>,
      );
      currentList = null;
    }

    if (line !== '') {
      elements.push(
        <p
          key={`p-${index}`}
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
}

export function LegalContent({ namespace, sections }: LegalContentProps) {
  const t = useTranslations(namespace);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="container mx-auto px-6 pt-32 pb-16">
      <div className="bg-card text-title mt-4 mb-12 rounded-md px-8 py-12">
        <h1 className="text-center text-3xl font-bold">{t('pageTitle')}</h1>
      </div>

      <div className="lg:grid-cols-legal flex flex-col items-center gap-12 lg:mx-auto lg:grid lg:w-fit lg:items-start lg:gap-x-32">
        <aside className="mb-8 w-full max-w-md lg:sticky lg:top-32 lg:mb-0">
          <TableOfContents
            className="mx-auto w-full sm:w-80"
            items={sections.map((section, index) => ({
              id: section.id,
              label: `${index + 1}. ${t(section.titleKey)}`,
            }))}
            activeId={activeId}
          />
        </aside>

        <div className="w-full max-w-2xl">
          {sections.map((section, index) => (
            <ContentSection
              key={section.id}
              id={section.id}
              title={`${index + 1}. ${t(section.titleKey)}`}
              className="pt-8"
            >
              {section.bodyKeys.map((bodyKey) => (
                <LegalRichText key={bodyKey} text={t(bodyKey)} />
              ))}
            </ContentSection>
          ))}
        </div>
      </div>
    </main>
  );
}
