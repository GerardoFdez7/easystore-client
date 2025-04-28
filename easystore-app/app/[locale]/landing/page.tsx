import Header from '@components/organisms/header';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      {/* Aquí puedes ir agregando el contenido de tu landing después */}
      <section className="p-8">
        <p className="mt-4 text-gray-600">
          Aquí irá el contenido de tu landing...
        </p>
      </section>
    </main>
  );
}
