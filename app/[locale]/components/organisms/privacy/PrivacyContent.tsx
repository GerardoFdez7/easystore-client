import { LegalContent } from '@organisms/shared/LegalContent';
import type { LegalSectionDefinition } from '@lib/types/legal-content';

const privacySections = [
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
] satisfies readonly LegalSectionDefinition[];

export function PrivacyContent() {
  return <LegalContent namespace="Privacy" sections={privacySections} />;
}
