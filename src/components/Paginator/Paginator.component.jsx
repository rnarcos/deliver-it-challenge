import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

const propTypes = {
  perPage: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  onChangePage: PropTypes.func,
};

const defaultProps = {
  perPage: 10,
  items: [],
  onChangePage: () => {},
};

export function Paginator({
  perPage,
  items,
  renderItem,
  keyExtractor,
  onChangePage,
}) {
  const [page, setPage] = useState(1);
  const paginatorListRef = useRef(null);

  useEffect(() => {
    onChangePage(page);
  }, [page, onChangePage]);

  function handlePageChange(_, nextPage) {
    const previousPage = page;

    setPage(nextPage);
    onChangePage({ previousPage, nextPage });
    paginatorListRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const shownItems = useMemo(() => (
    items.slice(
      perPage * page,
      perPage * (page + 1),
    )
  ), [items, page, perPage]);

  const numberOfPages = useMemo(() => (
    Math.ceil(items.length / perPage) - 1
  ), [items, perPage]);

  return (
    <Grid
      container
      ref={paginatorListRef}
      direction="column"
      spacing={3}
      alignItems="stretch"
      alignContent="center"
    >
      {shownItems.map((item, index) => (
        <Grid item key={keyExtractor({ item, index })}>
          {renderItem({ item, index })}
        </Grid>
      ))}
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handlePageChange}
      />
    </Grid>
  );
}

Paginator.propTypes = propTypes;
Paginator.defaultProps = defaultProps;
