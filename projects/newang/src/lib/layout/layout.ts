import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Root wrapper — applies bg + text color. `<na-app>…</na-app>` */
@Component({
  selector: 'na-app',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<div class="na-app"><ng-content /></div>`,
})
export class NaApp {}

/** Centered page column. `<na-page maxWidth="md">…</na-page>` */
@Component({
  selector: 'na-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<div class="na-page na-page--{{ maxWidth() }}"><ng-content /></div>`,
})
export class NaPage {
  readonly maxWidth = input<'sm' | 'md' | 'lg' | 'full'>('md');
}

/** Vertical rhythm. `<na-stack gap="md">…</na-stack>` */
@Component({
  selector: 'na-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<div class="na-stack na-gap--{{ gap() }}"><ng-content /></div>`,
})
export class NaStack {
  readonly gap = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
}

/** Horizontal row. `<na-row gap="md" align="center" justify="between">…</na-row>` */
@Component({
  selector: 'na-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<div class="na-row na-gap--{{ gap() }} na-align--{{ align() }} na-justify--{{ justify() }}"><ng-content /></div>`,
})
export class NaRow {
  readonly gap = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly align = input<'start' | 'center' | 'end' | 'stretch'>('center');
  readonly justify = input<'start' | 'center' | 'end' | 'between'>('start');
}

/** Responsive grid — collapses to one column under 768px. `<na-grid cols="3" gap="md">` */
@Component({
  selector: 'na-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<div class="na-grid na-cols--{{ cols() }} na-gap--{{ gap() }}"><ng-content /></div>`,
})
export class NaGrid {
  readonly cols = input<1 | 2 | 3 | 4>(2);
  readonly gap = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
}

/** Two-pane split that stacks on mobile. `<na-split ratio="280px_1fr">` */
@Component({
  selector: 'na-split',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<div class="na-split" [style.grid-template-columns]="columns()"><ng-content /></div>`,
})
export class NaSplit {
  readonly columns = input('280px 1fr');
}

@Component({
  selector: 'na-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<hr class="na-divider" />`,
})
export class NaDivider {}

@Component({
  selector: 'na-spacer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.scss',
  template: `<span class="na-spacer"></span>`,
})
export class NaSpacer {}
