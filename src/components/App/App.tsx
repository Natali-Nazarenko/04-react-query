import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

const notify = () => toast.error('No movies found for your request.');

function App() {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [request, setRequest] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movies', request],
        queryFn: () => fetchMovies(request),
        enabled: request !== '',
    });

    useEffect(() => {
        if (data?.length === 0) notify();
    }, [data]);

    const handleRequest = (request: string) => {
        setRequest(request);
    };

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };
    const closeModal = () => setSelectedMovie(null);

    return (
        <>
            <SearchBar onSubmit={handleRequest} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            <MovieGrid onSelect={openModal} movies={data ?? []} />
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
            <Toaster />
            {}
        </>
    );
}

export default App;
