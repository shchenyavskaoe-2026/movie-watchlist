import { Component, inject, signal } from '@angular/core';
import { CategoryForm } from '../category-form/category-form';
import { Modal } from '../modal/modal';
import { DatePipe } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-table',
  imports: [Modal, CategoryForm, DatePipe],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss',
})
export class CategoryTable {
    private categoryService = inject(CategoryService);

    categorys = signal<Category[]>([]);
    isModalOpen = signal(false);
    isDeleteModalOpen = signal(false);
    selectedCategory = signal<Category | null>(null);
    modalTitle = signal('');

    ngOnInit(): void {
      this.loadCategory();
    }

    loadCategory(): void {
      this.categoryService.getAll().subscribe(data => {
        this.categorys.set(data);
      });
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

    confirmDelete(): void {
      const c = this.selectedCategory();
      if (c) {
        this.categoryService.delete(c.id).subscribe(() => {
          this.loadCategory();
          this.closeDeleteModal();
        });
      }
    }

    onCategorySaved(): void {
      this.loadCategory();
      this.closeModal();
    }
}
