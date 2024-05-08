import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeoffreComponent } from './homeoffre.component';

describe('HomeoffreComponent', () => {
  let component: HomeoffreComponent;
  let fixture: ComponentFixture<HomeoffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeoffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
