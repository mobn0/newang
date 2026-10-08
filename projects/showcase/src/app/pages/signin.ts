import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NaAlert,
  NaButton,
  NaCard,
  NaCheckbox,
  NaField,
  NaForm,
  NaHeading,
  NaInput,
  NaLink,
  NaPage,
  NaStack,
  NaText,
} from 'newang';

// Mock sign-in page.
@Component({
  selector: 'app-signin',
  imports: [
    RouterLink,
    NaPage,
    NaStack,
    NaHeading,
    NaText,
    NaCard,
    NaForm,
    NaField,
    NaInput,
    NaCheckbox,
    NaButton,
    NaAlert,
    NaLink,
  ],
  template: `
    <na-page maxWidth="sm">
      <na-stack gap="lg">
        <na-stack gap="sm">
          <na-heading level="1">Sign in</na-heading>
          <na-text tone="muted">Welcome back. Your dashboard is one lime button away.</na-text>
        </na-stack>
        @if (failed()) {
          <na-alert tone="danger" title="Invalid credentials">That email and password combo doesn't match our records.</na-alert>
        }
        @if (done()) {
          <na-alert tone="success" title="Signed in">Redirecting you to the dashboard…</na-alert>
        }
        <na-card title="Account" subtitle="Use any email to preview the error state">
          <na-form submitLabel="Login" (submitted)="login()">
            <na-stack gap="md">
              <na-field label="Email" hint="Work email" [error]="emailError()">
                <input naInput id="signin-email" placeholder="you@co.com" [invalid]="!!emailError()" />
              </na-field>
              <na-field label="Password" hint="8+ characters">
                <input naInput id="signin-password" type="password" placeholder="••••••••" />
              </na-field>
              <na-checkbox label="Remember me" [(checked)]="remember" />
            </na-stack>
          </na-form>
        </na-card>
        <na-text tone="muted">No account? <na-link href="/dashboard">Continue as guest</na-link> · <a routerLink="/gallery">Component gallery</a></na-text>
        <na-button variant="ghost" (pressed)="toggleFail()">{{ failed() ? 'Hide error' : 'Preview error state' }}</na-button>
      </na-stack>
    </na-page>
  `,
})
export class SigninPage {
  readonly remember = signal(false);
  readonly failed = signal(false);
  readonly done = signal(false);
  readonly emailError = signal('');

  login(): void {
    this.failed.set(false);
    this.emailError.set('');
    this.done.set(true);
  }

  toggleFail(): void {
    const next = !this.failed();
    this.failed.set(next);
    this.emailError.set(next ? 'Enter a valid work email.' : '');
    if (next) this.done.set(false);
  }
}
