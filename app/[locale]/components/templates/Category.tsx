import HeaderCategory from '@organisms/category/HeaderCategory';
import MainCategory from '@organisms/category/MainCategory';

export default function CategoryTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderCategory />
      <MainCategory />
    </div>
  );
}
