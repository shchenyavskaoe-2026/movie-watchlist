  import { Injectable, inject, signal } from '@angular/core';
  import { MovieService } from './movie.service';
  import { CategoryService } from './category.service';
  import { Movie } from '../models/movie.model';
  import { Category } from '../models/category.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, switchMap, tap } from 'rxjs';

  @Injectable({ providedIn: 'root' })
  export class StateService {
    private movieService = inject(MovieService);
    private categoryService = inject(CategoryService);

    // Shared signals - one place for all data
    movies = signal<Movie[]>([]);
    categories = signal<Category[]>([]);

      // Search with BehaviorSubject
  private searchSubject = new BehaviorSubject<string>('');

constructor() {
      this.searchSubject.pipe(
      debounceTime(300),           // Wait 300ms after typing stops
      distinctUntilChanged(),       // Only if value changed
      switchMap(term => this.movieService.getAll(term))  // Call API
    ).subscribe(movies => {
      this.movies.set(movies);      // Update signal
    });
}
    

    // ============ MOVIES ============

    loadMovies(): void {
      this.movieService.getAll().subscribe(data => {
        this.movies.set(data);
      });
    }

      // Method for search box to call
  searchMovies(term: string): void {
    this.searchSubject.next(term);
  }

  
    createMovie(movie: Partial<Movie>): Observable<Movie> {
      return this.movieService.create(movie).pipe(
        tap(() => this.loadMovies())  // Reload after create
      );
    }

    updateMovie(id: number, movie: Partial<Movie>): Observable<Movie> {
      return this.movieService.update(id, movie).pipe(
        tap(() => this.loadMovies())  // Reload after update
      );
    }

    deleteMovie(id: number): Observable<boolean> {
      return this.movieService.delete(id).pipe(
        tap(() => this.loadMovies())  // Reload after delete
      );
    }

    // ============ CATEGORIES ============

    loadCategories(): void {
      this.categoryService.getAll().subscribe(data => {
        this.categories.set(data);
      });
    }

    createCategory(category: { name: string }): Observable<Category> {
      return this.categoryService.create(category).pipe(
        tap(() => this.loadCategories())
      );
    }

    updateCategory(id: number, category: { name: string }): Observable<Category> {
      return this.categoryService.update(id, category).pipe(
        tap(() => this.loadCategories())
      );
    }

    deleteCategory(id: number): Observable<boolean> {
      return this.categoryService.delete(id).pipe(
        tap(() => this.loadCategories())
      );
    }

    // ============ LOOKUPS ============

    getCategoryName(id: number): string {
      return this.categories().find(c => c.id === id)?.name || '';
    }

    getMovieTitle(id: number): string {
      return this.movies().find(m => m.id === id)?.title || '';
    }


    
  }