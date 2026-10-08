import { Component, signal } from '@angular/core';
import {
  NaBadge,
  NaBreadcrumbs,
  NaButton,
  NaCard,
  NaEmptyState,
  NaGrid,
  NaHeading,
  NaList,
  NaProgress,
  NaRow,
  NaStack,
  NaTable,
  NaTabs,
  NaText,
  NaToolbar,
} from 'newang';

// Mock product dashboard page.
@Component({
  selector: 'app-dashboard',
  imports: [
    NaStack,
    NaHeading,
    NaText,
    NaBreadcrumbs,
    NaToolbar,
    NaButton,
    NaBadge,
    NaCard,
    NaGrid,
    NaRow,
    NaTable,
    NaList,
    NaProgress,
    NaTabs,
    NaEmptyState,
  ],
  template: `
    <na-stack gap="lg">
      <na-breadcrumbs [items]="[{ label: 'Home', href: '/' }, { label: 'Workspace', href: '/dashboard' }, 'Overview']" />
      <na-stack gap="sm">
        <na-heading level="1">Good evening, Ada</na-heading>
        <na-text tone="muted">Here's what's happening across your workspace today.</na-text>
      </na-stack>
      <na-toolbar>
        <na-button variant="primary" size="sm">New report</na-button>
        <na-button variant="secondary" size="sm">Export</na-button>
        <na-badge tone="success">live</na-badge>
      </na-toolbar>
      <na-grid cols="3" gap="md">
        <na-card title="Revenue" subtitle="Last 30 days">
          <na-stack gap="sm">
            <na-heading level="2">$48,210</na-heading>
            <na-progress id="rev" [value]="72" />
          </na-stack>
        </na-card>
        <na-card title="Active users" subtitle="Rolling 7 days">
          <na-stack gap="sm">
            <na-heading level="2">12,804</na-heading>
            <na-progress id="users" [value]="45" />
          </na-stack>
        </na-card>
        <na-card title="Churn" subtitle="Target under 2%">
          <na-stack gap="sm">
            <na-heading level="2">1.4%</na-heading>
            <na-progress id="churn" [value]="14" />
          </na-stack>
        </na-card>
      </na-grid>
      <na-tabs [tabs]="['Reports', 'Activity']" [(active)]="tab">
        @if (tab() === 0) {
          <na-table
            [columns]="[{ key: 'name', header: 'Report' }, { key: 'owner', header: 'Owner' }, { key: 'status', header: 'Status' }]"
            [rows]="[
              { name: 'Q3 revenue', owner: 'Ada', status: 'Ready' },
              { name: 'Churn deep-dive', owner: 'Grace', status: 'Draft' },
              { name: 'Onboarding funnel', owner: 'Linus', status: 'Ready' },
            ]"
          />
        } @else {
          <na-list>
            <li>Ada exported Q3 revenue</li>
            <li>Grace shared churn deep-dive</li>
            <li>Linus invited 3 teammates</li>
          </na-list>
        }
      </na-tabs>
      <na-row gap="md">
        <na-empty-state title="No archived reports" description="Archived reports will show up here." />
      </na-row>
    </na-stack>
  `,
})
export class DashboardPage {
  readonly tab = signal(0);
}
