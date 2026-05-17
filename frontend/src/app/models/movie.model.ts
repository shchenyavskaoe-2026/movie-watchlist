import { Category } from "./category.model";


export interface Movie {
        id: number;
    title: string;
    year: number;
    director: string;
    plot: string;
    poster: string;
    imdbId: string;
    rating: number;
    isWatched: boolean;
    createdAt: Date;
    categories: Category[];
}