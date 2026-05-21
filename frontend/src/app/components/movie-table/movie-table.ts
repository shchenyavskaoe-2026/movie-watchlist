
  import { Component, inject, signal } from '@angular/core';
  import { MovieService } from '../../services/movie.service';
  import { Movie } from '../../models/movie.model';
  import { Modal } from '../modal/modal';
  import { MovieForm } from '../movie-form/movie-form';
  import { DatePipe } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { StateService } from '../../services/state.service';
  import { SearchBox } from '../search-box/search-box';






@Component({
  selector: 'app-movie-table',
  imports: [Modal, MovieForm, DatePipe, SearchBox],
  templateUrl: './movie-table.html',
  styleUrl: './movie-table.scss',
})
 export class MovieTable {
  // In the class:
  state = inject(StateService);
    
    isModalOpen = signal(false);
    isDeleteModalOpen = signal(false);
    selectedMovie = signal<Movie | null>(null);
    modalTitle = signal('');
 




    ngOnInit(): void {
    
    this.state.loadMovies();
    this.state.loadCategories();

    }


  confirmDelete(): void {
    const movie = this.selectedMovie();
    if (movie) {
      this.state.deleteMovie(movie.id).subscribe(() => {
        this.closeDeleteModal();
      });
    }
  }

  onMovieSaved(): void {
    // No need to reload - StateService does it automatically
    this.closeModal();
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

  }

