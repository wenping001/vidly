import { useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';

function Movies() {
  const [allMovies, setMovies] = useState(getMovies());
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (movie) => {
    const deleted_movies = allMovies.filter((m) => m._id !== movie._id);
    setMovies(deleted_movies);
  };

  const handleLike = (movie) => {
    const m = [...allMovies];
    const index = m.indexOf(movie);
    m[index] = { ...allMovies[index] };
    m[index].liked = !allMovies[index].liked;
    setMovies(m);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { length: count } = allMovies;
  if (count === 0) return <p>There are no movies in the database.</p>;

  const movies = paginate(allMovies, currentPage, pageSize);
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
      <Pagination
        itemCount="sad"
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Movies;
