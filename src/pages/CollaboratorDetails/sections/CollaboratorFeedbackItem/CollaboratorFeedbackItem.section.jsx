import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ThumbUp, Delete } from '@material-ui/icons';
import styles from './CollaboratorFeedbackItem.styles';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  collaboratorId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired,
  onFeedbackLike: PropTypes.func.isRequired,
  onFeedbackRemove: PropTypes.func.isRequired,
};

const defaultProps = {
  className: '',
};

const MAXIMUM_MILLISECONDS_TO_REMOVE_FEEDBACK = 300000;

const useStyles = makeStyles(styles);

function CollaboratorFeedbackItem({
  className,
  id,
  collaboratorId,
  createdAt,
  message,
  like,
  onFeedbackLike,
  onFeedbackRemove,
}) {
  const classes = useStyles();

  const feedbackCanBeRemoved = moment()
    .subtract(MAXIMUM_MILLISECONDS_TO_REMOVE_FEEDBACK, 'milliseconds')
    .isBefore(createdAt);

  function handleFeedbackLike() {
    onFeedbackLike({
      feedbackId: id,
      collaboratorId,
      newLikesQuantity: like + 1,
    });
  }

  function handleFeedbackRemove() {
    onFeedbackRemove({
      feedbackId: id,
      collaboratorId,
    });
  }

  return (
    <Card className={classNames(classes.cardContainer, className)}>
      <CardContent className={classes.feedbackContentWrapper}>
        <Typography variant="caption">
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.feedbackActionsWrapper}>
        <div className={classes.feedbackLikesWrapper}>
          <Typography variant="button" className={classes.feedbackLikes}>
            {like}
          </Typography>
          <IconButton size="small" onClick={handleFeedbackLike}>
            <ThumbUp className={classes.feedbackActionIcon} />
          </IconButton>
        </div>
        {feedbackCanBeRemoved && (
          <IconButton size="small" onClick={handleFeedbackRemove}>
            <Delete className={classes.feedbackActionIcon} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

CollaboratorFeedbackItem.propTypes = propTypes;
CollaboratorFeedbackItem.defaultProps = defaultProps;

export default CollaboratorFeedbackItem;
