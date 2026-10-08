import { Directive, ElementRef, HostBinding, inject, input } from '@angular/core';

/**
 * Flat tooltip via attribute. No wrapper component needed:
 * `<span naTooltip="Saved!">Hover me</span>`
 * Bubble styling ships with `@include na.base()` — zero consumer CSS.
 * `tabindex="0"` is only added when the host is not natively focusable and
 * the tooltip is non-empty; empty tooltips render nothing.
 */
@Directive({
  selector: '[naTooltip]',
  standalone: true,
})
export class NaTooltip {
  readonly naTooltip = input('', { alias: 'naTooltip' });

  private readonly el = inject(ElementRef<HTMLElement>);

  @HostBinding('attr.data-na-tooltip')
  get tip(): string | null {
    return this.naTooltip() || null;
  }

  @HostBinding('attr.tabindex')
  get tabbable(): number | null {
    if (!this.naTooltip()) return null;
    // Component hosts (e.g. <na-button naTooltip>) are custom elements: the
    // inner native control already takes a tab stop, so adding another one
    // on the host would trap keyboard users on a dead stop.
    const el = this.el.nativeElement;
    if (isNativelyFocusable(el) || hasFocusableDescendant(el)) return null;
    return 0;
  }
}

const FOCUSABLE_TAGS = new Set(['button', 'input', 'select', 'textarea']);
const FOCUSABLE_DESCENDANT =
  'button, a[href], input, select, textarea, audio[controls], video[controls], [contenteditable], [tabindex]';

function isNativelyFocusable(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase();
  if (FOCUSABLE_TAGS.has(tag)) return true;
  if (tag === 'a' && el.hasAttribute('href')) return true;
  if (tag === 'audio' || tag === 'video') return el.hasAttribute('controls');
  if (el.hasAttribute('contenteditable')) return true;
  return false;
}

function hasFocusableDescendant(el: HTMLElement): boolean {
  return el.querySelector(FOCUSABLE_DESCENDANT) !== null;
}
