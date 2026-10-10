'use client';

import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@shadcn/ui/toggle-group';

export const salesRanges = { '90d': 90, '30d': 30, '7d': 7 } as const;
export type SalesRange = keyof typeof salesRanges;

const rangeLabels = {
  '90d': '3months',
  '30d': '30days',
  '7d': '7days',
} as const satisfies Record<SalesRange, string>;

interface ChartTotalSalesRangeProps {
  value?: SalesRange;
  defaultValue?: SalesRange;
  onValueChange?: (value: SalesRange) => void;
  disabled?: boolean;
}

/** Range picker shared by the chart and its skeleton; it needs no server data. */
export function ChartTotalSalesRange({
  value,
  defaultValue = '90d',
  onValueChange,
  disabled = false,
}: ChartTotalSalesRangeProps) {
  const t = useTranslations('Dashboard');

  const selectRange = (next: string) => {
    if (next in salesRanges) onValueChange?.(next as SalesRange);
  };

  return (
    <>
      <Select
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onValueChange={selectRange}
        disabled={disabled}
      >
        <SelectTrigger
          size="sm"
          className="w-44 @[767px]/card:hidden"
          aria-label={t('salesOverTime')}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {(Object.keys(salesRanges) as SalesRange[]).map((range) => (
              <SelectItem key={range} value={range}>
                {t(rangeLabels[range])}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ToggleGroup
        type="single"
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onValueChange={selectRange}
        disabled={disabled}
        variant="outline"
        aria-label={t('salesOverTime')}
        className="hidden @[767px]/card:flex"
      >
        {(Object.keys(salesRanges) as SalesRange[]).map((range) => (
          <ToggleGroupItem key={range} value={range}>
            {t(rangeLabels[range])}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}
