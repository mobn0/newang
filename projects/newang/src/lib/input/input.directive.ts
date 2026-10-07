import { Directive } from '@angular/core';

/**
 * Styles any native input/textarea/select. No classes needed:
 * `<input naInput placeholder="you@co.com" />`
 * Pair with `<na-field>` for label/hint/error — still zero CSS.
 */
@Directive({
  selector: 'input[naInput], textarea[naInput], select[naInput]',
  standalone: true,
  host: { class: 'na-input' },
})
export class NaInput {}
