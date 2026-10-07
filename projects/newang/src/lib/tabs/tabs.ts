import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/**
 * Opinionated tabs. Labels in, lime underline for active — no pill glow.
 * `<na-tabs [tabs]="['One','Two']" [(active)]="i"><ng-content /></na-tabs>`
 */
@Component({
  selector: 'na-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tabs.scss',
  template: `
    <div class="na-tabs" role="tablist">
      @for (tab of tabs(); track $index) {
        <button
          type="button"
          role="tab"
          class="na-tabs__tab"
          [class.na-tabs__tab--active]="$index === active()"
          [attr.aria-selected]="$index === active()"
          (click)="active.set($index)"
        >
          {{ tab }}
        </button>
      }
    </div>
    <div class="na-tabs__panel"><ng-content /></div>
  `,
})
export class NaTabs {
  readonly tabs = input<string[]>([]);
  readonly active = model(0);
}
