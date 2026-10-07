import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';

export interface NaTableColumn {
  key: string;
  header: string;
}

export interface NaBreadcrumb {
  label: string;
  href?: string;
}

/**
 * Pre-styled table with empty state. No CSS needed:
 * `<na-table [columns]="[{key:'name',header:'Name'}]" [rows]="[{name:'Ada'}]" />`
 */
@Component({
  selector: 'na-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `
    <div class="na-table-wrap">
      <table class="na-table">
        <thead>
          <tr>
            @for (col of columns(); track col.key) {
              <th scope="col">{{ col.header }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr>
              @for (col of columns(); track col.key) {
                <td>{{ row[col.key] }}</td>
              }
            </tr>
          } @empty {
            <tr>
              <td class="na-table__empty" [attr.colspan]="columns().length || 1">
                {{ emptyMessage() }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class NaTable {
  readonly columns = input<NaTableColumn[]>([]);
  readonly rows = input<Record<string, string | number>[]>([]);
  readonly emptyMessage = input('No rows to show.');
}

/** Simple stacked list with dividers. */
@Component({
  selector: 'na-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `<ul class="na-list"><ng-content /></ul>`,
})
export class NaList {}

/** Breadcrumbs with lime current page. Plain strings render as text; `{label, href}` items render as links. */
@Component({
  selector: 'na-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `
    <nav class="na-crumbs" aria-label="Breadcrumb">
      @for (crumb of normalized(); track $index) {
        @if ($index > 0) {
          <span class="na-crumbs__sep" aria-hidden="true">/</span>
        }
        @if ($index === normalized().length - 1) {
          <span class="na-crumbs__current" aria-current="page">{{ crumb.label }}</span>
        } @else if (crumb.href) {
          <a class="na-crumbs__item na-crumbs__link" [href]="crumb.href">{{ crumb.label }}</a>
        } @else {
          <span class="na-crumbs__item">{{ crumb.label }}</span>
        }
      }
    </nav>
  `,
})
export class NaBreadcrumbs {
  readonly items = input<(string | NaBreadcrumb)[]>([]);

  normalized(): NaBreadcrumb[] {
    return this.items().map((c) => (typeof c === 'string' ? { label: c } : c));
  }
}

/** Inline spinner — flat lime ring, no glow. */
@Component({
  selector: 'na-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `<span class="na-spinner" role="status" [attr.aria-label]="label()"></span>`,
})
export class NaSpinner {
  readonly label = input('Loading');
}

/** Flat progress bar — solid lime fill, no gradient. `value` is clamped to 0–100. */
@Component({
  selector: 'na-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `
    <div
      class="na-progress"
      role="progressbar"
      [attr.aria-valuenow]="clamped()"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="na-progress__fill" [style.width.%]="clamped()"></div>
    </div>
  `,
})
export class NaProgress {
  readonly value = input(0, { transform: numberAttribute });

  clamped(): number {
    const v = this.value();
    if (Number.isNaN(v)) return 0;
    return Math.min(100, Math.max(0, v));
  }
}
