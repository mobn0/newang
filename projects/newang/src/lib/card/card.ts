import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Flat card with baked-in padding. Header/body/footer via projection. */
@Component({
  selector: 'na-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card.scss',
  template: `
    <section class="na-card">
      @if (title() || subtitle()) {
        <header class="na-card__header">
          @if (title()) {
            <h3 class="na-card__title">{{ title() }}</h3>
          }
          @if (subtitle()) {
            <p class="na-card__subtitle">{{ subtitle() }}</p>
          }
        </header>
      }
      <div class="na-card__body"><ng-content /></div>
    </section>
  `,
})
export class NaCard {
  readonly title = input('');
  readonly subtitle = input('');
}
