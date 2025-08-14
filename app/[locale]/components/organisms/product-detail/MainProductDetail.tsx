'use client';

import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Checkbox } from '@shadcn/ui/checkbox';
import { Card, CardContent } from '@shadcn/ui/card';
import { Archive, Plus, X, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@shadcn/ui/alert-dialog';
import Title from '@atoms/product-detail/Title';
import Description from '@atoms/product-detail/Description';
import Multimedia from '@atoms/product-detail/Multimedia';
import Category from '@molecules/product-detail/Category';
import TypeProduct from '@atoms/product-detail/TypeProduct';
import Tags from '@molecules/product-detail/Tags';
import TableVariants from '@molecules/product-detail/TableVariants';

export default function MainProductDetail() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isArchived, setIsArchived] = useState(false);

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
    <main className="pt-22 2xl:m-5">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <SiderbarDashboard />
        <SidebarInset>
          <SiteHeader title="New Product" />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 px-5 py-4 md:gap-6 md:py-6">
                {/* Main Content */}
                <div className="space-y-6">
                  {/* Title */}
                  <Title />

                  {/* Short Description */}
                  <Description label="Short Description" />

                  {/* Long Description */}
                  <Description label="Long Description" className="h-30" />

                  {/* Multimedia */}
                  <Multimedia />

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

                  {/* Brand Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#000000]">
                        Brand
                      </label>
                      <Input
                        defaultValue="TechPro"
                        className="border-[#e2e8f0] bg-[#ffffff]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#000000]">
                        Manufacturer
                      </label>
                      <Input
                        defaultValue="TechPro"
                        className="border-[#e2e8f0] bg-[#ffffff]"
                      />
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <label className="text-sm font-medium text-[#000000]">
                        Sustainability
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#d9d9d9] text-[#737373]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add sustainability
                      </Button>
                    </div>

                    <Card className="border-[#e2e8f0] bg-[#ffffff]">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="border-b border-[#e2e8f0]">
                              <tr>
                                <th className="p-4 text-left text-sm font-medium text-[#737373]">
                                  <Checkbox />
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-[#737373]">
                                  Certification
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-[#737373]">
                                  Recycled Percentage
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-[#737373]">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-[#e2e8f0] last:border-b-0">
                                <td className="p-4">
                                  <Checkbox />
                                </td>
                                <td className="p-4">
                                  <Input
                                    placeholder="ISO 14001"
                                    className="border-[#e2e8f0] bg-[#ffffff] text-sm"
                                  />
                                </td>
                                <td className="p-4">
                                  <Input
                                    placeholder="85%"
                                    className="border-[#e2e8f0] bg-[#ffffff] text-sm"
                                  />
                                </td>
                                <td className="p-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#ed2727] hover:text-[#d12525]"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                              <tr className="border-b border-[#e2e8f0] last:border-b-0">
                                <td className="p-4">
                                  <Checkbox />
                                </td>
                                <td className="p-4">
                                  <Input
                                    placeholder="FSC Certified"
                                    className="border-[#e2e8f0] bg-[#ffffff] text-sm"
                                  />
                                </td>
                                <td className="p-4">
                                  <Input
                                    placeholder="70%"
                                    className="border-[#e2e8f0] bg-[#ffffff] text-sm"
                                  />
                                </td>
                                <td className="p-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#ed2727] hover:text-[#d12525]"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 pt-8">
                    <div className="flex justify-center gap-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="border border-[#ed2727] bg-[#ffffff] text-[#ed2727] hover:bg-[#ed2727] hover:text-[#ffffff]">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar producto?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El producto será
                              eliminado permanentemente de la base de datos.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-[#ed2727] hover:bg-[#d12525]">
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="border border-[#000000] bg-[#ffffff] text-[#000000] hover:bg-[#000000] hover:text-[#ffffff]">
                            <Archive className="mr-2 h-4 w-4" />
                            {isArchived
                              ? 'Desarchivar producto'
                              : 'Archivar producto'}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {isArchived
                                ? '¿Desarchivar producto?'
                                : '¿Archivar producto?'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {isArchived
                                ? 'Esta acción hará que el producto vuelva a estar disponible en la tienda.'
                                : 'Esta acción ocultará el producto de la tienda pero mantendrá toda su información.'}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => setIsArchived(!isArchived)}
                              className="bg-[#000000] hover:bg-[#1e1e1e]"
                            >
                              {isArchived ? 'Desarchivar' : 'Archivar'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        className="border-[#d9d9d9] bg-[#d9d9d9] text-[#737373]"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-[#000000] text-[#ffffff] hover:bg-[#1e1e1e]">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
