import SettingsTemplate from '@templates/Settings';
import type { SettingsTemplateProps } from '@lib/types/settings';

export default function SettingsLayout({ children }: SettingsTemplateProps) {
  return <SettingsTemplate>{children}</SettingsTemplate>;
}
