'use client';

type Props = {
  serials: string[];
  emptyText?: string;
};

export default function SerialChips({ serials, emptyText = '—' }: Props) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {serials?.length ? (
        serials.map((sn, i) =>
          sn ? (
            <span
              key={`${sn}-${i}`}
              className="text-accent bg-foreground inline-flex items-center rounded-full px-3 py-1 text-xs"
            >
              {sn}
            </span>
          ) : null,
        )
      ) : (
        <span className="text-muted-foreground text-sm">{emptyText}</span>
      )}
    </div>
  );
}
