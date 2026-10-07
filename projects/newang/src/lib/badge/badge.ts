import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NaBadgeTone = 'lime' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'na-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './badge.scss',
  template: `<span class="na-badge na-badge--{{ tone() }}"><ng-content /></span>`,
})
export class NaBadge {
  readonly tone = input<NaBadgeTone>('neutral');
}
