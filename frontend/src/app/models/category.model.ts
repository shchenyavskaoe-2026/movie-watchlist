import { Movie } from "./movie.model";

export interface Category {
    id: number;
    name: string;
    movie: Movie[]
}