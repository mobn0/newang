import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NaAlertTone = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'na-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './alert.scss',
  template: `
    <div class="na-alert na-alert--{{ tone() }}" role="alert">
      @if (title()) {
        <p class="na-alert__title">{{ title() }}</p>
      }
      <div class="na-alert__body"><ng-content /></div>
    </div>
  `,
})
export class NaAlert {
  readonly tone = input<NaAlertTone>('info');
  readonly title = input('');
}
