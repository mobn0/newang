import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

export type NaButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type NaButtonSize = 'sm' | 'md' | 'lg';

/**
 * Opinionated button. No classes needed:
 * `<na-button variant="primary" (pressed)="save()">Save</na-button>`
 * Defaults: `variant="primary"`, `size="md"`, `type="button"`. Pass `fullWidth` for a block button.
 */
@Component({
  selector: 'na-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './button.scss',
  template: `
    <button
      class="na-btn"
      [class.na-btn--primary]="variant() === 'primary'"
      [class.na-btn--secondary]="variant() === 'secondary'"
      [class.na-btn--ghost]="variant() === 'ghost'"
      [class.na-btn--danger]="variant() === 'danger'"
      [class.na-btn--sm]="size() === 'sm'"
      [class.na-btn--lg]="size() === 'lg'"
      [class.na-btn--block]="fullWidth()"
      [attr.type]="type()"
      [disabled]="disabled() || loading()"
      (click)="pressed.emit($event)"
    >
      @if (loading()) {
        <span class="na-btn__spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
})
export class NaButton {
  readonly variant = input<NaButtonVariant>('primary');
  readonly size = input<NaButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly pressed = output<MouseEvent>();
}
