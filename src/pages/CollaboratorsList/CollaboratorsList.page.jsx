import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useFetch } from '../../hooks';
import { Paginator } from '../../components';
import CollaboratorOverview from './sections/CollaboratorOverview/CollaboratorOverview.section';
import styles from './CollaboratorsList.styles';

const COLLABORATORS_PER_PAGE = 10;

const useStyles = makeStyles(styles);

function CollaboratorsListPage() {
  const { data } = useFetch('collaborator');
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.pageTitle}>
        Lista de colaboradores
      </Typography>
      {!data ? (
        <Grid
          item
          container
          justify="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <div className={classes.paginatorWrapper}>
          <Paginator
            perPage={COLLABORATORS_PER_PAGE}
            items={data}
            keyExtractor={({ item }) => String(item.id)}
            renderItem={({ item }) => (
              <CollaboratorOverview
                id={item.id}
                name={item.name}
                role={item.role}
                avatar={item.avatar}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}

export default CollaboratorsListPage;
