import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from "./components/movie-list/movie-list";
import { CategoryList } from "./components/category-list/category-list";
import { MovieForm } from './components/movie-form/movie-form';
import { CategoryForm } from './components/category-form/category-form';
import { Header } from './components/header/header';






@Component({
  selector: 'app-root',
  imports: [MovieList, CategoryList, MovieForm, CategoryForm, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
