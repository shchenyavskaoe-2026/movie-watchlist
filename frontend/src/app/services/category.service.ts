
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
  import { environment } from '../../environments/environment';
import { Category } from "../models/category.model";
import { Observable } from "rxjs";



  @Injectable({
    providedIn: 'root'
  })


    export class CategoryService {
   private apiUrl = `${environment.apiUrl}/categories`;

    constructor(private http: HttpClient) {}

   getAll(): Observable<Category[]> {
      return this.http.get<Category[]>(this.apiUrl);
    }

    getById(id: number): Observable<Category> {
      return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }

    create(category: { name: string }): Observable<Category> {
      return this.http.post<Category>(this.apiUrl, category);
    }

    update(id: number, category: { name: string }): Observable<Category> {
      return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
    }

    delete(id: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }


    
    }