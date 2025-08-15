import MainProfile from '@organisms/profile/MainProfile';
import HeaderProfile from '@organisms/profile/HeaderProfile';

export default function ProfileTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderProfile />
      <MainProfile />
    </div>
  );
}
