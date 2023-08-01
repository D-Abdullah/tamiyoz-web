import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarsidemenuComponent } from './navbarsidemenu.component';

describe('NavbarsidemenuComponent', () => {
  let component: NavbarsidemenuComponent;
  let fixture: ComponentFixture<NavbarsidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarsidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarsidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
