import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NaBadge,
  NaButton,
  NaCard,
  NaCode,
  NaGrid,
  NaHeading,
  NaRow,
  NaStack,
  NaText,
} from 'newang';

// Mock marketing landing page.
@Component({
  selector: 'app-landing',
  imports: [RouterLink, NaStack, NaHeading, NaText, NaButton, NaBadge, NaCard, NaGrid, NaCode, NaRow],
  template: `
    <na-stack gap="xl">
      <na-stack gap="md">
        <na-row gap="sm">
          <na-badge tone="lime">v1.2.0</na-badge>
          <na-badge>dark-only</na-badge>
          <na-badge tone="info">zero CSS</na-badge>
        </na-row>
        <na-heading level="1">Ship dark UI without writing CSS</na-heading>
        <na-text size="lg" tone="muted">
          NewAng is an opinionated Angular component library. Spacing, type, layout and form
          rhythm are baked into na-* components.
        </na-text>
        <na-row gap="sm">
          <na-button variant="primary" routerLink="/signin">Get started</na-button>
          <na-button variant="secondary" routerLink="/gallery">Browse components</na-button>
          <na-button variant="ghost" routerLink="/dashboard">Live dashboard</na-button>
        </na-row>
      </na-stack>
      <na-grid cols="3" gap="md">
        <na-card title="Zero consumer CSS" subtitle="No classes, no stylesheets">
          <na-text tone="muted">Control everything with inputs: gap, size, tone, variant, maxWidth, cols.</na-text>
        </na-card>
        <na-card title="Flat and square" subtitle="No gradients, no glows">
          <na-text tone="muted">1px borders for elevation. Square corners everywhere except radios, switches and spinners.</na-text>
        </na-card>
        <na-card title="Forms included" subtitle="Wired for reactive forms">
          <na-text tone="muted">Switches, checkboxes and radio groups implement ControlValueAccessor out of the box.</na-text>
        </na-card>
      </na-grid>
      <na-card title="Install">
        <na-stack gap="sm">
          <na-code>ng add newang</na-code>
          <na-text tone="muted">Wires the pastel-lime dark theme into src/styles.scss automatically.</na-text>
        </na-stack>
      </na-card>
    </na-stack>
  `,
})
export class LandingPage {}
