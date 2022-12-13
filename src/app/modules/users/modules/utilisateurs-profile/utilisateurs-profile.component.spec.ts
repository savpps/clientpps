import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursProfileComponent } from './utilisateurs-profile.component';

describe('UtilisateursProfileComponent', () => {
  let component: UtilisateursProfileComponent;
  let fixture: ComponentFixture<UtilisateursProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateursProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
