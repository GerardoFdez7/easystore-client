'use client';
import * as React from 'react';
import { Card, CardContent } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Plus, Trash2 } from 'lucide-react';

export default function PersonalizationList({
  t,
  options,
  setOptions,
}: {
  t: (k: string) => string;
  options: string[];
  setOptions: (fn: (prev: string[]) => string[]) => void;
}) {
  const add = () => setOptions((p) => [...p, '']);
  const upd = (i: number, v: string) =>
    setOptions((p) => p.map((x, idx) => (idx === i ? v : x)));
  const del = (i: number) => setOptions((p) => p.filter((_, idx) => idx !== i));

  return (
    <section className="space-y-2">
      <h3 className="text-foreground/90 text-sm font-semibold">
        {t('personalizationOptions')}
      </h3>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {options.length === 0 && (
              <p className="text-muted-foreground text-xs">
                {t('noPersonalizations') ?? 'No personalization options yet.'}
              </p>
            )}

            {options.map((val, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={val}
                  onChange={(e) => upd(i, e.target.value)}
                  placeholder={t('personalizationPlaceholder')}
                  className="bg-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700"
                  onClick={() => del(i)}
                  aria-label={t('delete') ?? 'Delete'}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" size="sm" onClick={add}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addPersonalization')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
