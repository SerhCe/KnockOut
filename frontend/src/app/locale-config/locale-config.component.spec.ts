import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleConfigComponent } from './locale-config.component';

describe('LocaleConfigComponent', () => {
  let component: LocaleConfigComponent;
  let fixture: ComponentFixture<LocaleConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
