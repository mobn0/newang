import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

/**
 * Opinionated field wrapper — label, hint and error spacing baked in.
 * `<na-field label="Email" hint="Work email" error="Invalid"><input naInput [invalid]="true" /></na-field>`
 *
 * Note: `error` only renders the message. Set `[invalid]="true"` (or
 * `aria-invalid="true"`) on the projected `naInput` to also paint the
 * danger border — the wrapper cannot reach into projected content itself.
 */
@Component({
  selector: 'na-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './field.scss',
  template: `
    <label class="na-field">
      @if (label()) {
        <span class="na-field__label">{{ label() }} @if (required()) {
          <span class="na-field__asterisk" aria-hidden="true">*</span>
        }</span>
      }
      <span class="na-field__control"><ng-content /></span>
      @if (error()) {
        <span class="na-field__error" role="alert">{{ error() }}</span>
      } @else if (hint()) {
        <span class="na-field__hint">{{ hint() }}</span>
      }
    </label>
  `,
})
export class NaField {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly required = input(false, { transform: booleanAttribute });
}
