import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTestComponent } from './post-test.component';

describe('PostTestComponent', () => {
  let component: PostTestComponent;
  let fixture: ComponentFixture<PostTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
