import { useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './Like';
function Movies() {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    const deleted_movies = movies.filter((m) => m._id !== movie._id);
    setMovies(deleted_movies);
  };

  const handleLike = (movie) => {
    const m = [...movies];
    const index = m.indexOf(movie);
    m[index] = { ...movies[index] };
    m[index].liked = !movies[index].liked;
    setMovies(m);
  };

  const { length: count } = movies;
  if (count === 0) return <p>There are no movies in the database.</p>;
  return (
    <>
      <p>Showing {count} movies in the database.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie?.liked} onClick={() => handleLike(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Movies;
