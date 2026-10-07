import { TestBed } from '@angular/core/testing';
import { NaFooter, NaHeader } from './shell';

describe('NaHeader/NaFooter shell gutters', () => {
  it('header defaults to full width with 16px side gutters', () => {
    const f = TestBed.createComponent(NaHeader);
    expect(f.componentInstance.maxWidth()).toBe('full');
    f.detectChanges();
    const el = f.nativeElement.querySelector('header.na-header');
    expect(el).toBeTruthy();
    expect(el.classList.contains('na-header--full')).toBe(true);
    expect(getComputedStyle(el).paddingInline).toBe('16px');
  });

  it('header maxWidth caps content to page widths', () => {
    const f = TestBed.createComponent(NaHeader);
    f.componentRef.setInput('maxWidth', 'md');
    f.detectChanges();
    const el = f.nativeElement.querySelector('header.na-header');
    expect(el.classList.contains('na-header--md')).toBe(true);
    expect(getComputedStyle(el).maxWidth).toBe('860px');
  });

  it('footer mirrors the gutter and maxWidth API', () => {
    const f = TestBed.createComponent(NaFooter);
    expect(f.componentInstance.maxWidth()).toBe('full');
    f.detectChanges();
    const el = f.nativeElement.querySelector('footer.na-footer');
    expect(getComputedStyle(el).paddingInline).toBe('16px');
    f.componentRef.setInput('maxWidth', 'lg');
    f.detectChanges();
    expect(el.classList.contains('na-footer--lg')).toBe(true);
    expect(getComputedStyle(el).maxWidth).toBe('1180px');
  });
});
