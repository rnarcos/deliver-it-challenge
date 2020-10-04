import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import styles from './CollaboratorData.styles';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const useStyles = makeStyles(styles);

function CollaboratorData({
  label,
  value,
}) {
  const classes = useStyles();

  return (
    <div className={classes.collaboratorDataWrapper}>
      <Typography variant="body1" className={classes.collaboratorDataTitle}>
        {label}
      </Typography>
      <div className={classes.collaboratorDataSeparator} />
      <Typography variant="body2" className={classes.collaboratorDataValue}>
        {value}
      </Typography>
    </div>
  );
}

CollaboratorData.propTypes = propTypes;

export default React.memo(CollaboratorData);
