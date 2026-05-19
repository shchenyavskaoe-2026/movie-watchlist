
  import { Component, inject, signal } from '@angular/core';
  import { MovieService } from '../../services/movie.service';
  import { Movie } from '../../models/movie.model';
  import { Modal } from '../modal/modal';
  import { MovieForm } from '../movie-form/movie-form';
  import { DatePipe } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-movie-table',
  imports: [Modal, MovieForm, DatePipe],
  templateUrl: './movie-table.html',
  styleUrl: './movie-table.scss',
})
 export class MovieTable {
    private movieService = inject(MovieService);
    private categoryService = inject(CategoryService);

    movies = signal<Movie[]>([]);
    isModalOpen = signal(false);
    isDeleteModalOpen = signal(false);
    selectedMovie = signal<Movie | null>(null);
    modalTitle = signal('');
  categories = signal<Category[]>([]);




    ngOnInit(): void {
      this.loadMovies();
         this.loadCategories();
    }

      loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories.set(data);
    });
  }

    getCategoryName(id: number): string {
    return this.categories().find(c => c.id === id)?.name || '';
  }

    loadMovies(): void {
      this.movieService.getAll().subscribe(data => {
        console.log('mmmm:', data)
        this.movies.set(data);
      });
    }

    openAddModal(): void {
      this.selectedMovie.set(null);
      this.modalTitle.set('Add Movie');
      this.isModalOpen.set(true);
    }

    openEditModal(movie: Movie): void {
      this.selectedMovie.set(movie);
      this.modalTitle.set('Edit Movie');
      this.isModalOpen.set(true);
    }

    openDeleteModal(movie: Movie): void {
      this.selectedMovie.set(movie);
      this.isDeleteModalOpen.set(true);
    }

    closeModal(): void {
      this.isModalOpen.set(false);
      this.selectedMovie.set(null);
    }

    closeDeleteModal(): void {
      this.isDeleteModalOpen.set(false);
      this.selectedMovie.set(null);
    }

    confirmDelete(): void {
      const movie = this.selectedMovie();
      if (movie) {
        this.movieService.delete(movie.id).subscribe(() => {
          this.loadMovies();
          this.closeDeleteModal();
        });
      }
    }

    onMovieSaved(): void {
      this.loadMovies();
      this.closeModal();
    }
  }

