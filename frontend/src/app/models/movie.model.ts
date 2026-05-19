import { Category } from "./category.model";


  export interface Movie {
    id: number;
    title: string;
    year: number | null ;
    director: string | null;
    plot: string | null;
    poster: string | null;
    imdbId: string | null;
    rating: number | null;
    isWatched: boolean;
    createdAt: Date;
   // categories: Category[];
    categoryIds: number[];
  }

  