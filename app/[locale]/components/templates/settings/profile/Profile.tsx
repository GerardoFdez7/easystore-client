import MainProfile from '@organisms/settings/profile/MainProfile';
import { ProfileDraftProvider } from '@contexts/settings/profile/ProfileDraftContext';

export default function ProfileTemplate() {
  return (
    <ProfileDraftProvider>
      <MainProfile />
    </ProfileDraftProvider>
  );
}
