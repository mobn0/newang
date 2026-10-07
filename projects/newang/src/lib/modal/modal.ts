import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Flat modal. `<na-modal title="Confirm" [open]="show" (closed)="show=false">…</na-modal>` */
@Component({
  selector: 'na-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './modal.scss',
  template: `
    @if (open()) {
      <div class="na-modal__overlay" (click)="closed.emit()">
        <div
          class="na-modal__dialog"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="title()"
          (click)="$event.stopPropagation()"
        >
          <header class="na-modal__header">
            <h2 class="na-modal__title">{{ title() }}</h2>
            <button class="na-modal__close" type="button" aria-label="Close" (click)="closed.emit()">✕</button>
          </header>
          <div class="na-modal__body"><ng-content /></div>
        </div>
      </div>
    }
  `,
})
export class NaModal {
  readonly title = input('Dialog');
  readonly open = input(false);
  readonly closed = output<void>();
}
