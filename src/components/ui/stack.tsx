
import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

type AlignItemsShort = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
const alignMap: Record<AlignItemsShort, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  //Default: Row = true
  row?: boolean,
  //Default: Gap = gap-2
  gap?: string,
  //Default: as System default
  justify?: string,
  align?: AlignItemsShort,
  margin?: string,
  padding?: string,
}

/**
 * Stack component - container for items in row or column.
 * - `row` = true → flex-row, false → flex-col
 * - `gap` = items gap, default=gap-2
 * - `justify` = justify following main axis
 * - `align` = align following cross-axis
 * - `margin` / `padding` = Dimens space/gap
 */
export function Stack({ row, gap = "gap-2", className, align, margin, padding, justify, ...props }: StackProps) {
  return (
    <div className={cn(
      "flex",
      row ? "flex-row" : "flex-col",
      gap,
      align ? alignMap[align] : '',
      justify,
      margin,
      padding,
      className,
    )}
      {...props}>
    </div>
  );
}