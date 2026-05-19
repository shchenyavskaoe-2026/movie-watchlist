import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Movie } from '../../models/movie.model';





@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.scss',
})
export class MovieForm implements OnInit, OnChanges {
      private fb = inject(FormBuilder);  // Angular 14+ inject function
      private movieService = inject(MovieService);
      private categoryService = inject(CategoryService);
      categories = signal<Category[]>([]);
      selectedCategoryIds = signal<number[]>([]);
  @Input() movie: Movie | null = null;
  @Output() saved = new EventEmitter<void>();


         

     movieForm = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      year: [2026],
      director: [''],
      plot: [''],
      poster: ['', [Validators.maxLength(500), Validators.pattern(/^https?:\/\/.+/)]],  // Add this
      rating: [null as number | null, [Validators.min(1), Validators.max(10)]],
      isWatched: [false]
    });



    ngOnInit(): void {
      this.loadCategories();

    }

      ngOnChanges(): void {
            console.log('Movie-form received:', this.movie);  // Add this



    if (this.movie) {
      // Edit mode - populate form
      this.movieForm.patchValue({
        title: this.movie.title,
        year: this.movie.year ?? 0,
        director: this.movie.director ?? '',
        plot: this.movie.plot ?? '',
        poster: this.movie.poster ?? '',
        rating: this.movie.rating,
        isWatched: this.movie.isWatched
      });
     this.selectedCategoryIds.set(this.movie.categoryIds || []);
    } else {
      // Add mode - reset form
      this.movieForm.reset();
      this.selectedCategoryIds.set([]);
    }
  }
  

    loadCategories(): void {
      this.categoryService.getAll().subscribe(data => {
        console.log('m-f :', data)
        this.categories.set(data);
      });
    }
    


        toggleCategory(categoryId: number): void {
      const current = this.selectedCategoryIds();
      if (current.includes(categoryId)) {
        this.selectedCategoryIds.set(current.filter(id => id !== categoryId));
      } else {
        this.selectedCategoryIds.set([...current, categoryId]);
      }
}









  onSubmit(): void {
    if (this.movieForm.valid) {
      const movie = {
        ...this.movieForm.value,
        categoryIds: this.selectedCategoryIds()
      };

      if (this.movie) {
        // Edit mode
        this.movieService.update(this.movie.id, movie).subscribe(() => {
          this.saved.emit();  // Tell parent to reload
        });
      } else {
        // Add mode
        this.movieService.create(movie).subscribe(() => {
          this.saved.emit();  // Tell parent to reload
          this.movieForm.reset();
          this.selectedCategoryIds.set([]);
        });
      }
    }
  }
  }


