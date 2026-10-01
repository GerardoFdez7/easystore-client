export interface LegalSectionDefinition {
  id: string;
  titleKey: string;
  bodyKeys: readonly string[];
}

export interface LegalContentProps {
  namespace: 'Privacy' | 'Terms';
  sections: readonly LegalSectionDefinition[];
}
