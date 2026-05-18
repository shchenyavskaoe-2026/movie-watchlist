import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from "./components/movie-list/movie-list";
import { CategoryList } from "./components/category-list/category-list";
import { MovieForm } from './components/movie-form/movie-form';





@Component({
  selector: 'app-root',
  imports: [MovieList, CategoryList, MovieForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
