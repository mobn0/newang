import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'na-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './avatar.scss',
  template: `
    @if (src()) {
      <img class="na-avatar__img" [src]="src()" [alt]="name()" />
    } @else {
      <span class="na-avatar__initials" aria-hidden="true">{{ initials() }}</span>
    }
  `,
})
export class NaAvatar {
  readonly name = input('New Ang');
  readonly src = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  initials(): string {
    return this.name()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
