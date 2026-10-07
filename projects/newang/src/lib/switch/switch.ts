import { ChangeDetectionStrategy, Component, booleanAttribute, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** Lime toggle. Works with `[(checked)]` or `formControl`. */
@Component({
  selector: 'na-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './switch.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NaSwitch), multi: true },
  ],
  template: `
    <label class="na-switch">
      <input
        type="checkbox"
        class="na-switch__input"
        [checked]="checked()"
        [disabled]="disabled() || cvaDisabled()"
        (change)="onInput($event)"
        (blur)="onTouched()"
      />
      <span class="na-switch__track" aria-hidden="true"><span class="na-switch__thumb"></span></span>
      @if (label()) {
        <span class="na-switch__label">{{ label() }}</span>
      }
    </label>
  `,
})
export class NaSwitch implements ControlValueAccessor {
  readonly label = input('');
  readonly checked = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  private readonly cvaDisabled = signal(false);

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
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
