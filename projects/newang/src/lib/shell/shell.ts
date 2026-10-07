import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NaShellWidth = 'sm' | 'md' | 'lg' | 'full';

/** App top bar. `<na-header title="Billing" subtitle="…"><na-button>…</na-button></na-header>`
 * Ships with 16px side gutters; `maxWidth` (default `"full"`) optionally
 * constrains content to the `na-page` widths so shell aligns with page. */
@Component({
  selector: 'na-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './shell.scss',
  template: `
    <header class="na-header na-header--{{ maxWidth() }}">
      <div class="na-header__titles">
        <h1 class="na-header__title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="na-header__subtitle">{{ subtitle() }}</p>
        }
      </div>
      <div class="na-header__actions"><ng-content /></div>
    </header>
  `,
})
export class NaHeader {
  readonly title = input('');
  readonly subtitle = input('');
  readonly maxWidth = input<NaShellWidth>('full');
}

@Component({
  selector: 'na-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './shell.scss',
  template: `<footer class="na-footer na-footer--{{ maxWidth() }}"><ng-content /></footer>`,
})
export class NaFooter {
  readonly maxWidth = input<NaShellWidth>('full');
}

/** Toolbar row for card headers / table toolbars. */
@Component({
  selector: 'na-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './shell.scss',
  template: `<div class="na-toolbar"><ng-content /></div>`,
})
export class NaToolbar {}
