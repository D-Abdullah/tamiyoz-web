import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmorebuttonComponent } from './readmorebutton.component';

describe('ReadmorebuttonComponent', () => {
  let component: ReadmorebuttonComponent;
  let fixture: ComponentFixture<ReadmorebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmorebuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmorebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
