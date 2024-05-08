import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToTestComponent } from './redirect-to-test.component';

describe('RedirectToTestComponent', () => {
  let component: RedirectToTestComponent;
  let fixture: ComponentFixture<RedirectToTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectToTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectToTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
