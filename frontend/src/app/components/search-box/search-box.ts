import { Component, inject } from '@angular/core';
  import { StateService } from '../../services/state.service';




@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss',
})
export class SearchBox {
    state = inject(StateService);


    
    onSearch(event: Event): void {
      const term = (event.target as HTMLInputElement).value;
      this.state.searchMovies(term);
    }
}
