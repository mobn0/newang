import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NaAvatar } from './avatar/avatar';
import { NaBreadcrumbs, NaProgress } from './data/data';
import { NaInput } from './input/input.directive';
import { NaModal } from './modal/modal';
import { NaRadioGroup } from './radio/radio';
import { NaCheckbox } from './checkbox/checkbox';
import { NaSwitch } from './switch/switch';
import { NaTooltip } from './tooltip/tooltip.directive';
import { NaLink } from './typography/typography';

@Component({ standalone: true, imports: [NaTooltip], template: `<span naTooltip="">x</span>` })
class EmptyTipHost {}

@Component({
  standalone: true,
  imports: [NaTooltip],
  template: `<span naTooltip="hi">a</span><button naTooltip="hi">b</button>`,
})
class TipHost {}

@Component({
  standalone: true,
  imports: [NaBreadcrumbs],
  template: `<na-breadcrumbs [items]="items" />`,
})
class CrumbHost {
  items: (string | { label: string; href?: string })[] = [
    'Home',
    { label: 'Docs', href: '/docs' },
    'Here',
  ];
}

@Component({
  standalone: true,
  imports: [NaSwitch, ReactiveFormsModule],
  template: `<na-switch [formControl]="ctrl" />`,
})
class FormSwitchHost {
  ctrl = new FormControl(false);
}

@Component({
  standalone: true,
  imports: [NaInput],
  template: `<input naInput [invalid]="true" />`,
})
class InvalidInputHost {}

describe('error-report regression checks', () => {
  it('avatar keeps both initials on double spaces', () => {
    const f = TestBed.createComponent(NaAvatar);
    f.componentRef.setInput('name', 'Ada  Lovelace');
    expect(f.componentInstance.initials()).toBe('AL');
  });

  it('progress clamps to 0-100', () => {
    const f = TestBed.createComponent(NaProgress);
    f.componentRef.setInput('value', 150);
    f.detectChanges();
    expect(f.componentInstance.clamped()).toBe(100);
    const host: HTMLElement = f.nativeElement;
    expect(host.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('100');
    f.componentRef.setInput('value', -5);
    f.detectChanges();
    expect(f.componentInstance.clamped()).toBe(0);
  });

  it('empty tooltip renders no bubble hook and no tabindex', async () => {
    await TestBed.configureTestingModule({ imports: [EmptyTipHost] }).compileComponents();
    const f: ComponentFixture<EmptyTipHost> = TestBed.createComponent(EmptyTipHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('span');
    expect(el.getAttribute('data-na-tooltip')).toBe(null);
    expect(el.getAttribute('tabindex')).toBe(null);
  });

  it('tooltip adds tabindex only for non-focusable hosts', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [TipHost] }).compileComponents();
    const f: ComponentFixture<TipHost> = TestBed.createComponent(TipHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('span').getAttribute('tabindex')).toBe('0');
    expect(f.nativeElement.querySelector('button').getAttribute('tabindex')).toBe(null);
  });

  it('breadcrumbs render links for href items and keep strings working', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [CrumbHost] }).compileComponents();
    const f: ComponentFixture<CrumbHost> = TestBed.createComponent(CrumbHost);
    f.detectChanges();
    await f.whenStable();
    const nav = f.nativeElement.querySelector('nav');
    expect(nav.querySelector('a.na-crumbs__link')?.getAttribute('href')).toBe('/docs');
    expect(nav.querySelector('.na-crumbs__current')?.textContent).toBe('Here');
  });

  it('CVA setDisabledState disables switch, checkbox and radio', () => {
    const s = TestBed.createComponent(NaSwitch);
    s.componentInstance.setDisabledState(true);
    s.detectChanges();
    expect(s.nativeElement.querySelector('input').disabled).toBe(true);
    const c = TestBed.createComponent(NaCheckbox);
    c.componentInstance.setDisabledState(true);
    c.detectChanges();
    expect(c.nativeElement.querySelector('input').disabled).toBe(true);
    const r = TestBed.createComponent(NaRadioGroup);
    r.componentRef.setInput('options', [{ value: 'a', label: 'A' }]);
    r.componentInstance.setDisabledState(true);
    r.detectChanges();
    expect(r.nativeElement.querySelector('input').disabled).toBe(true);
  });

  it('reactive form disable() disables the switch UI', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [FormSwitchHost] }).compileComponents();
    const f: ComponentFixture<FormSwitchHost> = TestBed.createComponent(FormSwitchHost);
    f.detectChanges();
    f.componentInstance.ctrl.disable();
    f.detectChanges();
    expect(f.nativeElement.querySelector('input').disabled).toBe(true);
  });

  it('modal emits closed on Escape only when open', () => {
    const f = TestBed.createComponent(NaModal);
    let n = 0;
    f.componentInstance.closed.subscribe(() => n++);
    f.componentRef.setInput('open', true);
    f.componentInstance.onWindowKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(n).toBe(1);
    f.componentRef.setInput('open', false);
    f.componentInstance.onWindowKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(n).toBe(1);
  });

  it('naInput invalid sets aria-invalid', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [InvalidInputHost] }).compileComponents();
    const f: ComponentFixture<InvalidInputHost> = TestBed.createComponent(InvalidInputHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('input').getAttribute('aria-invalid')).toBe('true');
  });

  it('bare na-link renders no href (no top-jump)', () => {
    const f = TestBed.createComponent(NaLink);
    f.detectChanges();
    expect(f.nativeElement.querySelector('a').getAttribute('href')).toBe(null);
  });

  it('radio groupName defaults are unique per instance', () => {
    const a = TestBed.createComponent(NaRadioGroup);
    const b = TestBed.createComponent(NaRadioGroup);
    expect(a.componentInstance.groupName()).not.toBe(b.componentInstance.groupName());
    expect(a.componentInstance.groupName()).toMatch(/^na-radio-\d+$/);
  });
});
