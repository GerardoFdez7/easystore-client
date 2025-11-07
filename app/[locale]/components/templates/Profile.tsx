import MainProfile from '@organisms/profile/MainProfile';
import SidebarProfile from '@organisms/profile/SidebarProfile';
import { Separator } from '@shadcn/ui/separator';

export default function ProfileTemplate() {
  return (
    <div className="bg-background mx-4 flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col md:min-h-screen md:flex-row md:items-center">
        <SidebarProfile />
        <Separator
          className="bg-title w-0.2! mx-6 hidden h-200! md:block"
          orientation="vertical"
          decorative={true}
        />
        <MainProfile />
      </div>
    </div>
  );
}
