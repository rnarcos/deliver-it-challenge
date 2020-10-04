import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import styles from './CollaboratorOverview.styles';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

const useStyles = makeStyles(styles);

function CollaboratorOverview({
  id,
  name,
  avatar,
  role,
}) {
  const classes = useStyles();
  return (
    <Grid
      item
      container
    >
      <Card className={classes.collaboratorOverviewCard}>
        <Link
          to={`/collaborators/${id}`}
          component={({ navigate, children, href }) => (
            <CardActionArea href={href}>
              {children}
            </CardActionArea>
          )}
        >
          <CardHeader
            title={name}
            subheader={role}
            avatar={<Avatar src={avatar} />}
          />
        </Link>
      </Card>
    </Grid>
  );
}

CollaboratorOverview.propTypes = propTypes;

export default React.memo(CollaboratorOverview);
