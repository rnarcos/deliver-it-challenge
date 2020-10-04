import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
} from '@material-ui/core';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

function CollaboratorOverview({
  id,
  name,
  avatar,
  role,
}) {
  return (
    <Card>
      <Link to={`/collaborators/${id}`} component={CardActionArea}>
        <CardHeader
          title={name}
          subheader={role}
          avatar={<Avatar src={avatar} />}
        />
      </Link>
    </Card>
  );
}

CollaboratorOverview.propTypes = propTypes;

export default React.memo(CollaboratorOverview);
