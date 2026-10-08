import { TestBed } from '@angular/core/testing';
import { NaFooter, NaHeader } from './shell';

describe('NaHeader/NaFooter shell gutters', () => {
  it('header defaults to full width with 16px edge padding all around', () => {
    const f = TestBed.createComponent(NaHeader);
    expect(f.componentInstance.maxWidth()).toBe('full');
    f.detectChanges();
    const el = f.nativeElement.querySelector('header.na-header');
    expect(el).toBeTruthy();
    expect(el.classList.contains('na-header--full')).toBe(true);
    const cs = getComputedStyle(el);
    expect(cs.paddingLeft).toBe('16px');
    expect(cs.paddingRight).toBe('16px');
    expect(cs.paddingTop).toBe('16px');
  });

  it('header maxWidth caps content to page widths', () => {
    const f = TestBed.createComponent(NaHeader);
    f.componentRef.setInput('maxWidth', 'md');
    f.detectChanges();
    const el = f.nativeElement.querySelector('header.na-header');
    expect(el.classList.contains('na-header--md')).toBe(true);
    expect(getComputedStyle(el).maxWidth).toBe('860px');
  });

  it('footer mirrors the edge padding and maxWidth API', () => {
    const f = TestBed.createComponent(NaFooter);
    expect(f.componentInstance.maxWidth()).toBe('full');
    f.detectChanges();
    const el = f.nativeElement.querySelector('footer.na-footer');
    const cs = getComputedStyle(el);
    expect(cs.paddingLeft).toBe('16px');
    expect(cs.paddingRight).toBe('16px');
    expect(cs.paddingBottom).toBe('16px');
    f.componentRef.setInput('maxWidth', 'lg');
    f.detectChanges();
    expect(el.classList.contains('na-footer--lg')).toBe(true);
    expect(getComputedStyle(el).maxWidth).toBe('1180px');
  });
});
