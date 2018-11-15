import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarDetailsComponent } from './menu-bar-details.component';

describe('MenuBarDetailsComponent', () => {
  let component: MenuBarDetailsComponent;
  let fixture: ComponentFixture<MenuBarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
