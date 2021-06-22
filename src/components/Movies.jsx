import { useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import { Link } from 'react-router-dom';

function Movies() {
  const pageSize = 4;
  const [allMovies, setMovies] = useState(getMovies());
  const [currentPage, setCurrentPage] = useState(1);

  const [genres, setGenres] = useState([
    { name: 'All Genres' },
    ...getGenres(),
  ]);
  const [selectedGenre, setSelectedGenre] = useState();

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

  const handleSelect = (genre) => {
    setCurrentPage(1);
    setSelectedGenre(genre);
  };

  const filterd =
    selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

  const { length: count } = filterd;
  if (count === 0) return <p>There are no movies in the database.</p>;
  const movies = paginate(filterd, currentPage, pageSize);
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedGenre={selectedGenre}
          onItemSelect={handleSelect}
        />
      </div>
      <div className="col">
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
                <td>
                  <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                </td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie?.liked}
                    onClick={() => handleLike(movie)}
                  />
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
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
