import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionAdminComponent } from './option-admin.component';

describe('OptionAdminComponent', () => {
  let component: OptionAdminComponent;
  let fixture: ComponentFixture<OptionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
