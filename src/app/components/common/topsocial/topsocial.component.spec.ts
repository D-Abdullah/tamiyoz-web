import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsocialComponent } from './topsocial.component';

describe('TopsocialComponent', () => {
  let component: TopsocialComponent;
  let fixture: ComponentFixture<TopsocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopsocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
