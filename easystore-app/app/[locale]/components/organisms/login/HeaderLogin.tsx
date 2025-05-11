import NaviLinks from '@components/molecules/login/NaviLinks';

export default function HeaderLogin() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 mt-0 flex h-20 items-center justify-end px-3 pt-4 pb-4 sm:h-25 sm:px-10">
      <div className="flex items-center gap-2">
        <NaviLinks />
      </div>
    </header>
  );
}
