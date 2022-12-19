import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumPaymentsComponent } from './medium-payments.component';

describe('MediumPaymentsComponent', () => {
  let component: MediumPaymentsComponent;
  let fixture: ComponentFixture<MediumPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
