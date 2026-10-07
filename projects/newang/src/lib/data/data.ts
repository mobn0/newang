import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface NaTableColumn {
  key: string;
  header: string;
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

/** Breadcrumbs with lime current page. */
@Component({
  selector: 'na-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `
    <nav class="na-crumbs" aria-label="Breadcrumb">
      @for (crumb of items(); track $index) {
        @if ($index > 0) {
          <span class="na-crumbs__sep" aria-hidden="true">/</span>
        }
        @if ($index === items().length - 1) {
          <span class="na-crumbs__current" aria-current="page">{{ crumb }}</span>
        } @else {
          <span class="na-crumbs__item">{{ crumb }}</span>
        }
      }
    </nav>
  `,
})
export class NaBreadcrumbs {
  readonly items = input<string[]>([]);
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

/** Flat progress bar — solid lime fill, no gradient. */
@Component({
  selector: 'na-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data.scss',
  template: `
    <div
      class="na-progress"
      role="progressbar"
      [attr.aria-valuenow]="value()"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="na-progress__fill" [style.width.%]="value()"></div>
    </div>
  `,
})
export class NaProgress {
  readonly value = input(0);
}
