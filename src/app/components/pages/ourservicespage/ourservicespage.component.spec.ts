import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurservicespageComponent } from './ourservicespage.component';

describe('OurservicespageComponent', () => {
  let component: OurservicespageComponent;
  let fixture: ComponentFixture<OurservicespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurservicespageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurservicespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
