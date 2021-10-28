import React from 'react';
import { Link } from 'react-router-dom';
import Like from './common/Like';

function MoviesTable({ movies, sortColumn, onDelete, onClick, onSort }) {
  const raiseSort = (path) => {
    const sc = { ...sortColumn };
    if (sc.path === path) {
      sc.order = sc.order === 'asc' ? 'desc' : 'asc';
    } else {
      sc.path = path;
      sc.order = 'asc';
    }
    onSort(sc);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => raiseSort('title')}>Title</th>
          <th onClick={() => raiseSort('genre.name')}>Genre</th>
          <th onClick={() => raiseSort('numberInStock')}>Stock</th>
          <th onClick={() => raiseSort('dailyRentalRate')}>Rate</th>
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
              <Like liked={movie?.liked} onClick={() => onClick(movie)} />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoviesTable;
