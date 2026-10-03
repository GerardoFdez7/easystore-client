import MainProfile from '@organisms/profile/MainProfile';
import SidebarProfile from '@organisms/profile/SidebarProfile';
import { ProfileDraftProvider } from '@contexts/ProfileDraftContext';
import BackButton from '@atoms/shared/BackButton';

export default function ProfileTemplate() {
  return (
    <div className="bg-background min-h-screen">
      <div className="p-page gap-section mx-auto flex w-full max-w-5xl flex-col">
        <div className="relative h-9">
          <BackButton />
        </div>
        <ProfileDraftProvider>
          <div className="lg:grid-cols-profile-page gap-section grid grid-cols-1 items-start">
            <SidebarProfile />
            <MainProfile />
          </div>
        </ProfileDraftProvider>
      </div>
    </div>
  );
}
