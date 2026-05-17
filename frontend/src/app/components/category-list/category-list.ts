  import { Component, signal, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { CategoryService } from '../../services/category.service';
  import { Category } from '../../models/category.model';

  @Component({
    selector: 'app-category-list',
    imports: [],
    templateUrl: './category-list.html',
    styleUrl: './category-list.scss',
  })
  export class CategoryList implements OnInit {
categories = signal<Category[]>([]);

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
      this.loadCategories();
    }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      console.log('Categories received:', data);
        this.categories.set(data);
    });
  }
  }
