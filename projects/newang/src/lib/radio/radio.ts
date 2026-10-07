import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * `<na-radio-group label="Plan"><na-radio value="free" /><na-radio value="pro" /></na-radio-group>`
 * Binds as a group via `[(value)]` or `formControl`.
 */
@Component({
  selector: 'na-radio-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './radio.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NaRadioGroup), multi: true },
  ],
  template: `
    <div class="na-radio-group" role="radiogroup" [attr.aria-label]="label()">
      @if (label()) {
        <p class="na-radio-group__label">{{ label() }}</p>
      }
      <div class="na-radio-group__options">
        @for (opt of options(); track opt.value) {
          <label class="na-radio">
            <input
              type="radio"
              class="na-radio__input"
              [name]="groupName()"
              [value]="opt.value"
              [checked]="value() === opt.value"
              [disabled]="disabled()"
              (change)="pick(opt.value)"
              (blur)="onTouched()"
            />
            <span class="na-radio__dot" aria-hidden="true"></span>
            <span class="na-radio__label">{{ opt.label }}</span>
          </label>
        }
      </div>
    </div>
  `,
})
export class NaRadioGroup implements ControlValueAccessor {
  readonly label = input('');
  readonly options = input<{ value: string | number; label: string }[]>([]);
  readonly value = model<string | number | undefined>(undefined);
  readonly disabled = input(false);
  readonly groupName = input(`na-radio-${Math.floor(Math.random() * 1e6)}`);

  private onChange: (v: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  pick(v: string | number): void {
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(v: string | number | undefined): void {
    this.value.set(v);
  }
  registerOnChange(fn: (v: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(): void {
    // driven by `disabled()` input
  }
}
