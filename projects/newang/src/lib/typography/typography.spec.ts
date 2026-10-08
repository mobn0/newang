import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NaHeading } from './typography';

@Component({
  standalone: true,
  imports: [NaHeading],
  template: `
    <na-heading level="1">One</na-heading>
    <na-heading level="2">Two</na-heading>
    <na-heading level="3">Three</na-heading>
    <na-heading level="4">Four</na-heading>
    <na-heading level="9">Fallback</na-heading>
  `,
})
class HeadingHost {}

describe('NaHeading', () => {
  it('projects content into every level', async () => {
    await TestBed.configureTestingModule({ imports: [HeadingHost] }).compileComponents();
    const f = TestBed.createComponent(HeadingHost);
    f.detectChanges();
    const el: HTMLElement = f.nativeElement;
    expect(el.querySelector('h1')?.textContent).toBe('One');
    expect(el.querySelector('h2')?.textContent).toBe('Two');
    expect(el.querySelector('h3')?.textContent).toBe('Three');
    expect(el.querySelector('h4')?.textContent).toBe('Four');
  });

  it('falls back to h2 for unknown levels', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [HeadingHost] }).compileComponents();
    const f = TestBed.createComponent(HeadingHost);
    f.detectChanges();
    const h2s = [...f.nativeElement.querySelectorAll('h2')].map((e: Element) => e.textContent);
    expect(h2s).toEqual(['Two', 'Fallback']);
  });
});
