export interface Movies {
    page: number;
    results: Movie[];
    total_pages: number;
}

export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}
