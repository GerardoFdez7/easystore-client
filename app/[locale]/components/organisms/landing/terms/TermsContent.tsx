import { LegalContent } from '@organisms/shared/LegalContent';
import type { LegalSectionDefinition } from '@lib/types/legal-content';

const termsSections = [
  {
    id: 'acceptance',
    titleKey: 'acceptanceTitle',
    bodyKeys: ['acceptanceP1', 'acceptanceP2', 'acceptanceP3'],
  },
  {
    id: 'account',
    titleKey: 'accountTitle',
    bodyKeys: [
      'accountIntro',
      'accountRequirements',
      'accountRegistration',
      'accountResponsibility',
      'accountRestrictions',
    ],
  },
  {
    id: 'general',
    titleKey: 'generalTitle',
    bodyKeys: [
      'generalP1',
      'generalP2',
      'generalP3',
      'generalP4',
      'generalP5',
      'generalP6',
      'generalP7',
      'generalP8',
    ],
  },
  {
    id: 'payments',
    titleKey: 'paymentsTitle',
    bodyKeys: [
      'paymentsIntro',
      'paymentsPlans',
      'paymentsCycle',
      'paymentsTaxes',
      'paymentsMethods',
      'paymentsSuspension',
      'paymentsRefunds',
    ],
  },
  {
    id: 'thirdParty',
    titleKey: 'thirdPartyTitle',
    bodyKeys: [
      'thirdPartyIntro',
      'thirdPartyIntegrations',
      'thirdPartyLiability',
    ],
  },
  {
    id: 'confidentiality',
    titleKey: 'privacyPolicyTitle',
    bodyKeys: [
      'confidentialityIntro',
      'privacyPolicySection',
      'merchantDataSection',
    ],
  },
  {
    id: 'termination',
    titleKey: 'terminationTitle',
    bodyKeys: [
      'terminationIntro',
      'terminationUserSection',
      'terminationEasyStoreSection',
      'terminationEffectsSection',
    ],
  },
  {
    id: 'liability',
    titleKey: 'liabilityTitle',
    bodyKeys: ['noWarrantiesSection', 'limitsOfLiabilitySection'],
  },
  {
    id: 'miscellaneous',
    titleKey: 'miscTitle',
    bodyKeys: [
      'miscIntro',
      'miscGoverningLawSection',
      'miscJurisdictionSection',
      'miscSeverabilitySection',
      'miscEntireAgreementSection',
      'miscAssignmentSection',
      'miscNoticesSection',
    ],
  },
] satisfies readonly LegalSectionDefinition[];

export function TermsContent() {
  return <LegalContent namespace="Terms" sections={termsSections} />;
}
