'use client';

import React from 'react';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { Button } from '@shadcn/ui/button';

export default function MainStockDetail() {
  return (
    <div className="flex-1 pt-16">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8">
          <section>
            <div className="flex flex-col space-y-6">
              {/* Color y Producto */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" defaultValue="red" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="product">Producto</Label>
                  <Input
                    id="product"
                    defaultValue="Nike t-shirts"
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Almacén */}
              <div>
                <Label htmlFor="warehouse">Almacén</Label>
                <Input
                  id="warehouse"
                  defaultValue="Jose Warehouse"
                  className="mt-2"
                />
              </div>

              {/* Disponibilidad y Reservados */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="available">Disponible</Label>
                  <div className="mt-2 flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                      G
                    </div>
                    <Input
                      id="available"
                      type="number"
                      defaultValue="6"
                      className="ml-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="reserved">Reservados</Label>
                  <Input id="reserved" type="number" className="mt-2" />
                </div>
              </div>

              {/* Ubicación del Producto */}
              <div>
                <Label htmlFor="location">Ubicación del Producto</Label>
                <Input id="location" className="mt-2" />
              </div>

              {/* Fecha de Reabastecimiento y Número de Lote */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="replenishment-date">
                    Fecha Estimada de Reabastecimiento
                  </Label>
                  <Input id="replenishment-date" type="date" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="lot-number">Número de Lote</Label>
                  <Input id="lot-number" className="mt-2" />
                </div>
              </div>

              {/* Números de Serie */}
              <div>
                <Label>Números de Serie</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <div className="rounded bg-gray-200 px-3 py-1">
                    SN-9FAK-23J7-LBO2
                  </div>
                  <div className="rounded bg-gray-200 px-3 py-1">
                    SN-4M2B-7K91-H8D4
                  </div>
                  <div className="rounded bg-gray-200 px-3 py-1">
                    SN-8W7Z-5G4N-217Y
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar Cambios</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
