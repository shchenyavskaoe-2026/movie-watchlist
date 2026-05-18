import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';





@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.scss',
})
export class MovieForm implements OnInit {
      private fb = inject(FormBuilder);  // Angular 14+ inject function
      private movieService = inject(MovieService);
      private categoryService = inject(CategoryService);
      categories = signal<Category[]>([]);
      selectedCategoryIds = signal<number[]>([]);



         

     movieForm = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      year: [2026],
      director: [''],
      plot: [''],
      rating: [null as number | null, [Validators.min(1), Validators.max(10)]],
      isWatched: [false]
    });



    ngOnInit(): void {
      this.loadCategories();
    }

    loadCategories(): void {
      this.categoryService.getAll().subscribe(data => {
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
            categories: this.selectedCategoryIds().map(id => ({ id } as Category))

        };
        this.movieService.create(movie).subscribe(result => {
          console.log('Saved!', result);
          this.movieForm.reset();
          this.selectedCategoryIds.set([]);
        });
      }
    }


}
