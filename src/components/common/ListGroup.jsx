function ListGroup({
  items: genres,
  valueProperty,
  textProperty,
  selectedGenre,
  onItemSelect,
}) {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={
            selectedGenre === genre
              ? 'list-group-item active'
              : 'list-group-item'
          }
          style={{ cursor: 'pointer' }}
          onClick={() => onItemSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};
export default ListGroup;
