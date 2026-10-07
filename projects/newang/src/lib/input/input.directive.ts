import { Directive, HostBinding, booleanAttribute, input } from '@angular/core';

/**
 * Styles any native input/textarea/select. No classes needed:
 * `<input naInput placeholder="you@co.com" />`
 * Pair with `<na-field>` for label/hint/error — still zero CSS.
 * Pass `[invalid]="true"` (e.g. when the field has an error) to paint the
 * danger border via `[aria-invalid='true']`; message text alone does not
 * restyle the control.
 */
@Directive({
  selector: 'input[naInput], textarea[naInput], select[naInput]',
  standalone: true,
  host: { class: 'na-input' },
})
export class NaInput {
  /** Sets `aria-invalid="true"` on the host, which triggers the danger border. */
  readonly invalid = input(false, { transform: booleanAttribute });

  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): string | null {
    return this.invalid() ? 'true' : null;
  }
}
