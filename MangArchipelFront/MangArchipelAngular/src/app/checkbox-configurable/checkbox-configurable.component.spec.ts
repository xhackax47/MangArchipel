import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxConfigurableComponent } from './checkbox-configurable.component';

describe('CheckboxConfigurableComponent', () => {
  let component: CheckboxConfigurableComponent;
  let fixture: ComponentFixture<CheckboxConfigurableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxConfigurableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxConfigurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
