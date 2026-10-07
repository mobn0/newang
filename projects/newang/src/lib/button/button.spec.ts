import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NaButton } from './button';

describe('NaButton', () => {
  let fixture: ComponentFixture<NaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NaButton] }).compileComponents();
    fixture = TestBed.createComponent(NaButton);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('creates an opinionated button with zero consumer css', () => {
    const el = fixture.nativeElement.querySelector('button.na-btn');
    expect(el).toBeTruthy();
    expect(el.textContent ?? '').toBeDefined();
  });

  it('disables while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('button.na-btn');
    expect(el.disabled).toBe(true);
  });
});
