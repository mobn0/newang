import { ChangeDetectionStrategy, Component, booleanAttribute, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** `<na-checkbox label="Remember me" [(checked)]="v" />` or `formControl`. */
@Component({
  selector: 'na-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './checkbox.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NaCheckbox), multi: true },
  ],
  template: `
    <label class="na-check">
      <input
        type="checkbox"
        class="na-check__input"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="onInput($event)"
        (blur)="onTouched()"
      />
      <span class="na-check__box" aria-hidden="true"></span>
      <span class="na-check__label">{{ label() }}</span>
    </label>
  `,
})
export class NaCheckbox implements ControlValueAccessor {
  readonly label = input('');
  readonly checked = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });

  private onChange: (v: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).checked;
    this.checked.set(v);
    this.onChange(v);
  }

  writeValue(v: boolean): void {
    this.checked.set(!!v);
  }
  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(): void {
    // driven by `disabled()` input
  }
}
