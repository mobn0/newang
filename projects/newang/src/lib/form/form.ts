import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Opinionated form wrapper — vertical stack + submit row baked in.
 * `<na-form submitLabel="Save" (submitted)="save()">…fields…</na-form>`
 */
@Component({
  selector: 'na-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './form.scss',
  template: `
    <form
      class="na-form"
      novalidate
      (submit)="onSubmit($event)"
    >
      <div class="na-form__fields"><ng-content /></div>
      <div class="na-form__actions">
        @if (showCancel()) {
          <button type="button" class="na-form__cancel" (click)="cancelled.emit()">Cancel</button>
        }
        <button type="submit" class="na-form__submit" [disabled]="submitDisabled()">
          {{ submitLabel() }}
        </button>
      </div>
    </form>
  `,
})
export class NaForm {
  readonly submitLabel = input('Submit');
  readonly submitDisabled = input(false);
  readonly showCancel = input(false);
  readonly submitted = output<SubmitEvent>();
  readonly cancelled = output<void>();

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.submitted.emit(e);
  }
}
