'use client';
import * as React from 'react';
import { Card, CardContent } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Plus } from 'lucide-react';
import type { Attribute } from '@lib/utils/types/variant';

export default function AttributesCard({
  t,
  attributes,
  setAttributes,
  notes,
  setNotes,
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

  return (
    <section className="space-y-2">
      <Card className="rounded-xl border">
        <CardContent className="p-4 sm:p-5">
          {/* header envuelve en móvil */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-foreground/90 text-sm font-semibold">
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

          {/* filas: 1 columna en móvil, 12 cols desde sm */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-12">
            {attributes.map((a) => (
              <React.Fragment key={a.id}>
                <Input
                  placeholder={t('attributeKey')}
                  className="bg-white sm:col-span-5"
                  value={a.key}
                  onChange={(e) => upd(a.id, 'key', e.target.value)}
                />
                <Input
                  placeholder={t('attributeValue')}
                  className="bg-white sm:col-span-6"
                  value={a.value}
                  onChange={(e) => upd(a.id, 'value', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-self-end sm:col-span-1"
                  onClick={() => del(a.id)}
                  aria-label={t('removeAttribute')}
                >
                  ✕
                </Button>
              </React.Fragment>
            ))}
          </div>

          <Textarea
            placeholder={t('notes')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-28 bg-white"
          />
        </CardContent>
      </Card>
    </section>
  );
}
