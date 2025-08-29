'use client';

import DetailCategory from '@organisms/detail-category/FormCategoryDetail';

export default function MainDetailCategory({ id }: { id: string }) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:py-6 lg:px-8 2xl:m-5">
      <DetailCategory id={id} />
    </main>
  );
}
