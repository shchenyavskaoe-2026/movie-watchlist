  import { computed, inject } from '@angular/core';
  import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';
  import { CategoryService } from '../services/category.service';
  import { Category } from '../models/category.model';







    // 1. Define the state shape
  type CategoryState = {
    categories: Category[];
    loading: boolean;
    error: string | null;
  };


    // 2. Initial state
  const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
  };


    // 3. Create the store
  export const CategoryStore = signalStore(
    { providedIn: 'root' },  // Makes it a singleton like a service

    // State
    withState(initialState),

    // Computed values
    withComputed((store) => ({
      categoriesCount: computed(() => store.categories().length),
      isEmpty: computed(() => store.categories().length === 0),
    })),

    // Methods
    withMethods((store, categoryService = inject(CategoryService)) => ({

      // Load all categories
      loadCategories(): void {
        patchState(store, { loading: true, error: null });

        categoryService.getAll().subscribe({
          next: (categories) => {
            patchState(store, { categories, loading: false });
          },
          error: (err) => {
            patchState(store, { error: err.message, loading: false });
          }
        });
      },

      // Create category
      createCategory(data: { name: string }): void {
        categoryService.create(data).subscribe({
          next: (newCategory) => {
            patchState(store, {
              categories: [...store.categories(), newCategory]
            });
          },
          error: (err) => {
            patchState(store, { error: err.message });
          }
        });
      },

      // Update category
      updateCategory(id: number, data: { name: string }): void {
        categoryService.update(id, data).subscribe({
          next: (updated) => {
            patchState(store, {
              categories: store.categories().map(c =>
                c.id === id ? updated : c
              )
            });
          },
          error: (err) => {
            patchState(store, { error: err.message });
          }
        });
      },

      // Delete category
      deleteCategory(id: number): void {
        categoryService.delete(id).subscribe({
          next: () => {
            patchState(store, {
              categories: store.categories().filter(c => c.id !== id)
            });
          },
          error: (err) => {
            patchState(store, { error: err.message });
          }
        });
      },

    })),

    // Hooks - auto-load on init
    withHooks({
      onInit(store) {
        store.loadCategories();
      }
    })
  );