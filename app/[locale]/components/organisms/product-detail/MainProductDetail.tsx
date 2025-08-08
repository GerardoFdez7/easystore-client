'use client';

import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { Checkbox } from '@shadcn/ui/checkbox';
import { Badge } from '@shadcn/ui/badge';
import { Card, CardContent } from '@shadcn/ui/card';
import { Archive, Upload, Plus, X, Trash2 } from 'lucide-react';
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

export default function MainProductDetail() {
  const [tags, setTags] = useState(['Gaming', 'Gaming', 'Gaming']);
  const [newTag, setNewTag] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Computers']);
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

  const variants = [
    { id: 1, name: 'Variant 1', price: '₡ 2000.00', stock: '10' },
    { id: 2, name: 'Variant 2', price: '₡ 2000.00', stock: '10' },
    { id: 3, name: 'Variant 3', price: '₡ 2000.00', stock: '10' },
  ];
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
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#000000]">
                      Multimedia
                    </label>
                    <Card className="border-2 border-dashed border-[#d9d9d9] bg-[#ffffff]">
                      <CardContent className="p-12 text-center">
                        <div className="space-y-4">
                          <div className="text-lg font-medium text-[#000000]">
                            Multimedia
                          </div>
                          <div className="text-sm text-[#737373]">
                            Drag and drop or browse to upload
                          </div>
                          <Button
                            variant="outline"
                            className="border-[#d9d9d9] text-[#737373]"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#000000]">
                      Category
                    </label>
                    <div className="mb-3 flex items-center gap-2">
                      <Select
                        value=""
                        onValueChange={(value) => {
                          if (value && !selectedCategories.includes(value)) {
                            setSelectedCategories([
                              ...selectedCategories,
                              value,
                            ]);
                          }
                        }}
                      >
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-[#ffffff]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computers">Computers</SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="accessories">
                            Accessories
                          </SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-[#d9d9d9] text-[#000000] hover:bg-[#c4c0c0]"
                        >
                          {category}
                          <button
                            onClick={() => removeCategory(index)}
                            className="ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Variants */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <label className="text-sm font-medium text-[#000000]">
                        Variants
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#d9d9d9] text-[#737373]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add variant
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
                                  Variant
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-[#737373]">
                                  Price
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-[#737373]">
                                  Stock
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {variants.map((variant) => (
                                <tr
                                  key={variant.id}
                                  className="border-b border-[#e2e8f0] last:border-b-0"
                                >
                                  <td className="p-4">
                                    <Checkbox />
                                  </td>
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#737373] text-sm font-medium text-[#ffffff]">
                                        V
                                      </div>
                                      <span className="text-sm text-[#000000]">
                                        {variant.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-4 text-sm text-[#000000]">
                                    {variant.price}
                                  </td>
                                  <td className="p-4 text-sm text-[#000000]">
                                    {variant.stock}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Type Product */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#000000]">
                      Type Product
                    </label>
                    <Select defaultValue="physical">
                      <SelectTrigger className="border-[#e2e8f0] bg-[#ffffff]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">PHYSICAL</SelectItem>
                        <SelectItem value="digital">DIGITAL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#000000]">
                      Tags
                    </label>
                    <div className="mb-3 flex items-center gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Gaming"
                        className="border-[#e2e8f0] bg-[#ffffff]"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button
                        onClick={addTag}
                        size="sm"
                        variant="outline"
                        className="border-[#d9d9d9]"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-[#d9d9d9] text-[#000000] hover:bg-[#c4c0c0]"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(index)}
                            className="ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

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
