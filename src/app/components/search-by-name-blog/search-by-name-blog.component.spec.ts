import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByNameBlogComponent } from './search-by-name-blog.component';

describe('SearchByNameBlogComponent', () => {
  let component: SearchByNameBlogComponent;
  let fixture: ComponentFixture<SearchByNameBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByNameBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByNameBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
