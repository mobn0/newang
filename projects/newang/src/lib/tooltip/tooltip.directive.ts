import { Directive, HostBinding, input } from '@angular/core';

/**
 * Flat tooltip via attribute. No wrapper component needed:
 * `<span naTooltip="Saved!">Hover me</span>`
 * Bubble styling ships with `@include na.base()` — zero consumer CSS.
 */
@Directive({
  selector: '[naTooltip]',
  standalone: true,
})
export class NaTooltip {
  readonly naTooltip = input('', { alias: 'naTooltip' });

  @HostBinding('attr.data-na-tooltip')
  get tip(): string {
    return this.naTooltip();
  }

  @HostBinding('attr.tabindex')
  get tabbable(): number {
    return 0;
  }
}
