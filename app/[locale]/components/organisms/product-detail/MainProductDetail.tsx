'use client';

import { useState } from 'react';
import InputProduct from '@atoms/product-detail/InputProduct';
import Description from '@atoms/product-detail/Description';
import Category from '@molecules/product-detail/Category';
import TypeProduct from '@atoms/product-detail/TypeProduct';
import Tags from '@molecules/product-detail/Tags';
import TableVariants from '@molecules/product-detail/TableVariants';
import Sustainability from '@molecules/product-detail/Sustainability';
import DeleteProduct from '@atoms/product-detail/DeleteProduct';
import ArchivedProduct from '@atoms/product-detail/ArchivedProduct';
import ButtonCancel from '@atoms/product-detail/ButtonCancel';
import ButtonSave from '@atoms/product-detail/ButtonSave';

export default function MainProductDetail() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const removeCategory = (index: number) => {
    setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
  };

  return (
    <main className="m-2 2xl:m-5">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Title */}
        <InputProduct label="Title" />

        {/* Short Description */}
        <Description label="Short Description" />

        {/* Long Description */}
        <Description label="Long Description" className="h-30" />

        {/* Multimedia */}

        {/* Category */}
        <Category
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          removeCategory={removeCategory}
        />

        {/* Variants */}
        <TableVariants />

        {/* Type Product */}
        <TypeProduct />

        {/* Tags */}
        <Tags
          tags={tags}
          newTag={newTag}
          setNewTag={setNewTag}
          addTag={addTag}
          removeTag={removeTag}
        />

        {/* Brand & Manufacturer */}
        <div className="grid grid-cols-2 gap-4">
          <InputProduct label="Brand" />
          <InputProduct label="Manufacturer" />
        </div>

        {/* Sustainability */}
        <Sustainability />

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pt-8">
          <div className="flex justify-center gap-4 pb-6">
            <DeleteProduct />
            <ArchivedProduct />
          </div>
          <div className="flex justify-end gap-4">
            <ButtonCancel />
            <ButtonSave />
          </div>
        </div>
      </div>
    </main>
  );
}
