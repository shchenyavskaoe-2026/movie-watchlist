import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Movie } from '../../models/movie.model';
import { Category } from '../../models/category.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit, OnChanges{






  private fb = inject(FormBuilder);
      private movieService = inject(MovieService);
      private categoryService = inject(CategoryService);


      movies = signal<Movie[]>([]);
      selectedMoviesIds = signal<number[]>([]);
  @Input() category: Category | null = null;
  @Output() saved = new EventEmitter<void>();




  categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]]
  });


  ngOnInit(): void {
         this.loadMovies();
  }
    ngOnChanges(changes: SimpleChanges): void {
       if (this.category) {
      // Edit mode - populate form
      this.categoryForm.patchValue({
        name: this.category.name,
  
      });
      this.selectedMoviesIds.set(this.category.movie?.map(c => c.id) || []);
    } else {
      // Add mode - reset form
      this.categoryForm.reset();
      this.selectedMoviesIds.set([]);
    }
  }

      loadMovies(): void {
      this.movieService.getAll().subscribe(data => {
        this.movies.set(data);
      });
    }



  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
       if (this.category) {
// Edit mode
        this.categoryService.update(this.category.id, category as { name: string }).subscribe(() => {
          this.saved.emit();
         }) } else {
    this.categoryService.create(category as { name: string }).subscribe(result => {
        console.log('Category saved!', result);
        this.categoryForm.reset();
         this.saved.emit();
    }
    )}}}

      
      
  
  





}
