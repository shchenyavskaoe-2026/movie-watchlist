import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
  import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { Movie } from "../models/movie.model";




  @Injectable({
    providedIn: 'root'
  })

  export class MovieService {
     private apiUrl = `${environment.apiUrl}/movies`;

    constructor(private http: HttpClient) {}



      getAll(search?: string): Observable<Movie[]> {
    const url = search ? `${this.apiUrl}?search=${search}` : this.apiUrl;
    return this.http.get<Movie[]>(url);
  }




getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`)
}

create(newMovie: Partial<Movie>): Observable<Movie> {
return this.http.post<Movie>(this.apiUrl, newMovie)
}

update(id: number, movie: Partial<Movie>): Observable<Movie> {
return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie)
}

    delete(id: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }








  }