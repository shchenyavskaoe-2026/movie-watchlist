import { Component, inject, signal } from '@angular/core';
import { CategoryForm } from '../category-form/category-form';
import { Modal } from '../modal/modal';
import { Category } from '../../models/category.model';
import { StateService } from '../../services/state.service';
import { DatePipe } from '@angular/common';
import { CategoryStore } from '../../stores/category.store';

@Component({
  selector: 'app-category-table',
  imports: [Modal, CategoryForm, DatePipe],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss',
})
export class CategoryTable {

  // In the class:
  state = inject(StateService);

     // Inject the store instead of StateService
    readonly store = inject(CategoryStore);
     isModalOpen = signal(false);
    isDeleteModalOpen = signal(false);
    selectedCategory = signal<Category | null>(null);
    modalTitle = signal('');
 


    ngOnInit(): void {

         this.state.loadMovies();
   // this.state.loadCategories();

    }

 


      confirmDelete(): void {
      const c = this.selectedCategory();
      if (c) {
        this.store.deleteCategory(c.id);
        this.closeDeleteModal();
      }
    }
  
  onCategorySaved(): void {
    // No need to reload - StateService does it automatically
    this.closeModal();
  }

    openAddModal(): void {

         this.selectedCategory.set(null);
      this.modalTitle.set('Add Category');
      this.isModalOpen.set(true);
    }

    openEditModal(c: Category): void {

         this.selectedCategory.set(c);
      this.modalTitle.set('Edit Category');
      this.isModalOpen.set(true);
    }

    openDeleteModal(c: Category): void {
      this.selectedCategory.set(c);
      this.isDeleteModalOpen.set(true);
    }

    closeModal(): void {
      this.isModalOpen.set(false);
      this.selectedCategory.set(null);
    }

    closeDeleteModal(): void {
      this.isDeleteModalOpen.set(false);
      this.selectedCategory.set(null);
    }


}
