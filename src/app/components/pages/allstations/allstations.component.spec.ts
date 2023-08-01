import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstationsComponent } from './allstations.component';

describe('AllstationsComponent', () => {
  let component: AllstationsComponent;
  let fixture: ComponentFixture<AllstationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllstationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
