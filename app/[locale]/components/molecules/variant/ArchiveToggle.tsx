'use client';
import { Label } from '@shadcn/ui/label';
import { Switch } from '@shadcn/ui/switch';

export default function ArchiveToggle({
  t,
  isArchived,
  setIsArchived,
}: {
  t: (k: string) => string;
  isArchived: boolean;
  setIsArchived: (v: boolean) => void;
}) {
  return (
    <section className="bg-card flex items-center justify-between rounded-md border px-4 py-3">
      <div>
        <Label className="text-sm">{t('isArchived')}</Label>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {t('isArchivedHint') ??
            'Archived variants are hidden in lists but remain retrievable via queries.'}
        </p>
      </div>
      <Switch checked={isArchived} onCheckedChange={setIsArchived} />
    </section>
  );
}
