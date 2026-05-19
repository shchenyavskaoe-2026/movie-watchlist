import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTable } from './movie-table';

describe('MovieTable', () => {
  let component: MovieTable;
  let fixture: ComponentFixture<MovieTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
