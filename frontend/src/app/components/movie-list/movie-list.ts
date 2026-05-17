  import { Component, OnInit, signal } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MovieService } from '../../services/movie.service';
  import { Movie } from '../../models/movie.model';

  @Component({
    selector: 'app-movie-list',
    imports: [],
    templateUrl: './movie-list.html',
    styleUrl: './movie-list.scss',
  })
  export class MovieList implements OnInit {
    movies = signal<Movie[]>([])
   

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
      this.loadMovies();
    }

    loadMovies(): void {
      this.movieService.getAll().subscribe(data => {
        this.movies.set(data)
      });
    }
  }
