import _ from 'lodash';
function Pagination(props) {
  const { itemCount, pageSize } = props;
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === props.currentPage ? 'page-item active' : 'page-item'
            }
          >
            <a
              className="page-link"
              onClick={() => {
                props.onPageChange(page);
              }}
              href="//#endregion"
            >
              {page}
            </a>
          </li>
        ))}
        {/* <li className="page-item">
          <a className="page-link">1</a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Pagination;
