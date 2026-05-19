import { Component } from '@angular/core';
import { CategoryList } from '../../components/category-list/category-list';
import { MovieList } from '../../components/movie-list/movie-list';

@Component({
  selector: 'app-home',
  imports: [CategoryList, MovieList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
