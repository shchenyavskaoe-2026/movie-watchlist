import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from "./components/movie-list/movie-list";
import { CategoryList } from "./components/category-list/category-list";

@Component({
  selector: 'app-root',
  imports: [MovieList, CategoryList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
