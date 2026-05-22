  import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
  import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
  import { Category } from '../../models/category.model';
  import { CategoryStore } from '../../stores/category.store';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit, OnChanges{


     // In the class:
    // state = inject(StateService);

  readonly store = inject(CategoryStore);

  private fb = inject(FormBuilder);

      selectedMoviesIds = signal<number[]>([]);
  @Input() category: Category | null = null;
  @Output() saved = new EventEmitter<void>();




  categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]]
  });


  ngOnInit(): void {
        //    this.state.loadMovies();
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







      
      
  
      onSubmit(): void {
      if (this.categoryForm.valid) {
        const data = this.categoryForm.value as { name: string };

        if (this.category) {
          this.store.updateCategory(this.category.id, data);
        } else {
          this.store.createCategory(data);
          this.categoryForm.reset();
        }

        this.saved.emit();
      }
    }





}
