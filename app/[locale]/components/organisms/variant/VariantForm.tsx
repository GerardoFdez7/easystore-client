'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import MediaUploader from '@molecules/variant/MediaUploader';
import PriceConditionRow from '@molecules/variant/PriceConditionRow';
import AttributesCard from '@molecules/variant/AttributesCard';
import DimensionsRow from '@molecules/variant/DimensionRow';
import CodesList from '@molecules/variant/CodesList';
import type { Attribute, Condition } from '@lib/utils/types/variant';
import { Button } from '@shadcn/ui/button';

export default function VariantForm() {
  const t = useTranslations('Variant');

  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const onPick = () => fileInputRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
  };

  const [condition, setCondition] = React.useState<Condition>('NEW');
  const [attributes, setAttributes] = React.useState<Attribute[]>([
    { id: crypto.randomUUID(), key: '', value: '' },
  ]);
  const [notes, setNotes] = React.useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(fd.entries());
    console.log({
      ...payload,
      condition,
      attributes,
      notes,
      hasImage: !!preview,
    });
    alert('Saved (mock). Conecta tu acción real.');
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-3xl space-y-8">
      <MediaUploader
        t={t}
        preview={preview}
        onPick={onPick}
        onFile={onFile}
        onDrop={onDrop}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
      />

      <PriceConditionRow
        t={t}
        condition={condition}
        setCondition={setCondition}
      />

      <AttributesCard
        t={t}
        attributes={attributes}
        setAttributes={setAttributes}
        notes={notes}
        setNotes={setNotes}
      />

      <DimensionsRow t={t} />
      <CodesList t={t} />

      {/* Actions inline */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" className="px-6">
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          className="text-background hover:bg-foreground/90 bg-black px-6"
        >
          {t('saveChanges')}
        </Button>
      </div>
    </form>
  );
}
