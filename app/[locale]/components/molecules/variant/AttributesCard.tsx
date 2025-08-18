'use client';
import * as React from 'react';
import { Card, CardContent } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { Attribute } from '@lib/utils/types/variant';

export default function AttributesCard({
  t,
  attributes,
  setAttributes,
}: {
  t: (k: string) => string;
  attributes: Attribute[];
  setAttributes: (fn: (prev: Attribute[]) => Attribute[]) => void;
  notes: string;
  setNotes: (v: string) => void;
}) {
  const add = () =>
    setAttributes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), key: '', value: '' },
    ]);

  const upd = (id: string, field: 'key' | 'value', val: string) =>
    setAttributes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: val } : a)),
    );

  const del = (id: string) =>
    setAttributes((prev) => prev.filter((a) => a.id !== id));

  const move = (id: string, dir: 'up' | 'down') =>
    setAttributes((prev) => {
      const idx = prev.findIndex((a) => a.id === id);
      if (idx === -1) return prev;
      const target = dir === 'up' ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[target]] = [copy[target], copy[idx]];
      return copy;
    });

  return (
    <section className="space-y-1">
      <Card className="rounded-xl border">
        <CardContent className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-foreground/90 ml-5 text-sm font-semibold">
              {t('attributes')}
            </h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 rounded-md"
              onClick={add}
            >
              <Plus className="mr-2 h-4 w-4" /> {t('addAttribute')}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {attributes.length === 0 && (
              <p className="text-muted-foreground text-xs">
                {t('noAttributesYet') ?? 'Aún no hay atributos.'}
              </p>
            )}

            {attributes.map((a, i) => (
              <div
                key={a.id}
                className="grid grid-cols-1 items-start gap-2 sm:grid-cols-12"
              >
                <div className="text-muted-foreground pt-6 text-xs sm:col-span-1 sm:text-center">
                  #{i + 1}
                </div>

                <div className="sm:col-span-4">
                  <Label className="text-xs">{t('attributeKey')}</Label>
                  <Input
                    placeholder={t('attributeKeyPlaceholder')}
                    className="mt-1 bg-white"
                    value={a.key}
                    onChange={(e) => upd(a.id, 'key', e.target.value)}
                  />
                </div>

                <div className="sm:col-span-5">
                  <Label className="text-xs">{t('attributeValue')}</Label>
                  <Input
                    placeholder={t('attributeValuePlaceholder')}
                    className="mt-1 bg-white"
                    value={a.value}
                    onChange={(e) => upd(a.id, 'value', e.target.value)}
                  />
                </div>

                <div className="flex gap-1 pt-6 sm:col-span-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => move(a.id, 'up')}
                    aria-label={t('moveUp') ?? 'Subir'}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => move(a.id, 'down')}
                    aria-label={t('moveDown') ?? 'Bajar'}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={() => del(a.id)}
                    aria-label={t('delete') ?? 'Eliminar'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
