
  import { Component, signal } from '@angular/core';
  import { MovieTable } from '../../components/movie-table/movie-table';
import { CategoryTable } from "../../components/category-table/category-table";


@Component({
  selector: 'app-settings',
  imports: [MovieTable, CategoryTable],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
   activeTab = signal<'movies' | 'categories'>('movies');

    setTab(tab: 'movies' | 'categories'): void {
      this.activeTab.set(tab);
    }

}
