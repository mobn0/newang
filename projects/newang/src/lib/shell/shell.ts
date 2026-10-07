import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** App top bar. `<na-header title="Billing" subtitle="…"><na-button>…</na-button></na-header>` */
@Component({
  selector: 'na-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './shell.scss',
  template: `
    <header class="na-header">
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
}

@Component({
  selector: 'na-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './shell.scss',
  template: `<footer class="na-footer"><ng-content /></footer>`,
})
export class NaFooter {}

/** Toolbar row for card headers / table toolbars. */
@Component({
  selector: 'na-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './shell.scss',
  template: `<div class="na-toolbar"><ng-content /></div>`,
})
export class NaToolbar {}
