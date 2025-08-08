import HeaderCategory from '@organisms/category/HeaderCategory';
import MainDetailCategory from '@organisms/detail-category/MainDetailCategory';

export default function CategoryDetail({ id }: { id: string }) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderCategory />
      <MainDetailCategory id={id} />
    </div>
  );
}
