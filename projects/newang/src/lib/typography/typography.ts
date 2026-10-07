import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';

/** `<na-heading level="1">Title</na-heading>` — size/weight/margins baked in. */
@Component({
  selector: 'na-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './typography.scss',
  template: `
    @switch (level()) {
      @case (1) {
        <h1 class="na-h na-h1"><ng-content /></h1>
      }
      @case (3) {
        <h3 class="na-h na-h3"><ng-content /></h3>
      }
      @case (4) {
        <h4 class="na-h na-h4"><ng-content /></h4>
      }
      @default {
        <h2 class="na-h na-h2"><ng-content /></h2>
      }
    }
  `,
})
export class NaHeading {
  // Accepts `level="1"` (string) as well as `[level]="1"` — coerced to 1-4.
  readonly level = input<1 | 2 | 3 | 4>(2, {
    transform: (v: unknown): 1 | 2 | 3 | 4 => {
      const n = numberAttribute(v);
      return n === 1 || n === 3 || n === 4 ? n : 2;
    },
  });
}

/** `<na-text tone="muted" size="sm">…</na-text>` */
@Component({
  selector: 'na-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './typography.scss',
  template: `<p class="na-text na-text--{{ tone() }} na-text--{{ size() }}"><ng-content /></p>`,
})
export class NaText {
  readonly tone = input<'default' | 'muted' | 'faint' | 'accent'>('default');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}

/** `<na-link href="…">Docs</na-link>` */
@Component({
  selector: 'na-link',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './typography.scss',
  template: `<a class="na-link" [href]="href()"><ng-content /></a>`,
})
export class NaLink {
  readonly href = input('#');
}

/** `<na-code>npm i</na-code>` */
@Component({
  selector: 'na-code',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './typography.scss',
  template: `<code class="na-code"><ng-content /></code>`,
})
export class NaCode {}

/** Pre-spaced empty state with optional action slot. */
@Component({
  selector: 'na-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './typography.scss',
  template: `
    <div class="na-empty">
      <p class="na-empty__title">{{ title() }}</p>
      @if (description()) {
        <p class="na-empty__desc">{{ description() }}</p>
      }
      <div class="na-empty__action"><ng-content /></div>
    </div>
  `,
})
export class NaEmptyState {
  readonly title = input('Nothing here yet');
  readonly description = input('');
}
