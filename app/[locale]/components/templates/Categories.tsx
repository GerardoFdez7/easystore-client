import HeaderCategory from '@organisms/categories/HeaderCategory';
import MainCategory from '@organisms/categories/MainCategory';

export default function CategoryTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderCategory />
      <MainCategory />
    </div>
  );
}
