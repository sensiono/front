import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishScreenFailComponent } from './finish-screen-fail.component';

describe('FinishScreenFailComponent', () => {
  let component: FinishScreenFailComponent;
  let fixture: ComponentFixture<FinishScreenFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishScreenFailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishScreenFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
