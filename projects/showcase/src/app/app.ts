import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NaApp, NaFooter, NaHeader, NaPage } from 'newang';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NaApp, NaHeader, NaFooter, NaPage],
  template: `
    <na-app>
      <na-header title="NewAng Showcase" subtitle="Mock sites exercising every component" maxWidth="lg">
        <nav class="show-nav">
          <a class="show-link" routerLink="/" routerLinkActive="show-link--active" [routerLinkActiveOptions]="{ exact: true }">Landing</a>
          <a class="show-link" routerLink="/dashboard" routerLinkActive="show-link--active">Dashboard</a>
          <a class="show-link" routerLink="/signin" routerLinkActive="show-link--active">Sign in</a>
          <a class="show-link" routerLink="/gallery" routerLinkActive="show-link--active">Gallery</a>
        </nav>
      </na-header>
      <na-page maxWidth="lg">
        <router-outlet />
      </na-page>
      <na-footer maxWidth="lg">
        <span>NewAng visual test site — dark, square, zero CSS.</span>
        <span>v1.2.0</span>
      </na-footer>
    </na-app>
  `,
})
export class App {}
