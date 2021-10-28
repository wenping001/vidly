import { React, useState } from 'react';
import _ from 'lodash';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';

function Movies() {
  const pageSize = 4;
  const [allMovies, setMovies] = useState(getMovies());
  const [currentPage, setCurrentPage] = useState(1);
  const genres = [{ id: '', name: 'All Genres' }, ...getGenres()];
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  const handleDelete = (movie) => {
    const deletedMovies = allMovies.filter((m) => m.id !== movie.id);
    setMovies(deletedMovies);
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

  const handleSort = (value) => {
    setSortColumn(value);
  };

  // filterd
  const filterd = selectedGenre && selectedGenre.id
    ? allMovies.filter((m) => m.genre.id === selectedGenre.id) : allMovies;

  const { length: count } = filterd;

  if (count === 0) return <p>There are no movies in the database.</p>;
  // sorting
  const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
  // pagination
  const movies = paginate(sorted, currentPage, pageSize);

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
        <p>
          Showing
          {count}
          movies in the database.
        </p>
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onClick={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
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
