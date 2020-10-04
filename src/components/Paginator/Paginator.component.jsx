import React, {
  useMemo,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

const propTypes = {
  className: PropTypes.string,
  initialPage: PropTypes.string,
  perPage: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  onChangePage: PropTypes.func,
};

const defaultProps = {
  className: '',
  initialPage: '1',
  perPage: 10,
  items: [],
  onChangePage: () => {},
};

export function Paginator({
  className,
  initialPage,
  perPage,
  items,
  renderItem,
  keyExtractor,
  onChangePage,
}) {
  const [page, setPage] = useState(Number.parseInt(initialPage, 10));
  const paginatorListRef = useRef(null);

  function handlePageChange(_, nextPage) {
    const previousPage = page;

    setPage(nextPage);
    onChangePage({ previousPage, nextPage });
    paginatorListRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    onChangePage(nextPage);
  }

  const shownItems = useMemo(() => (
    items.slice(
      perPage * (page - 1),
      perPage * page,
    )
  ), [items, page, perPage]);

  const numberOfPages = useMemo(() => (
    Math.ceil(items.length / perPage)
  ), [items, perPage]);

  return (
    <Grid
      container
      className={className}
      ref={paginatorListRef}
      direction="column"
      spacing={3}
      alignItems="stretch"
      alignContent="center"
    >
      {shownItems.map((item, index) => (
        <React.Fragment key={keyExtractor({ item, index })}>
          {renderItem({ item, index })}
        </React.Fragment>
      ))}
      <Grid
        item
        container
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
}

Paginator.propTypes = propTypes;
Paginator.defaultProps = defaultProps;
