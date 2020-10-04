import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  TextareaAutosize,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import styles from './CollaboratorFeedbackFormDialog.styles';

const propTypes = {
  collaboratorName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const useStyles = makeStyles(styles);

function CollaboratorFeedbackFormDialog({
  collaboratorName,
  open,
  onClose,
  onSubmit,
}) {
  const classes = useStyles();
  const [feedbackMessage, setFeedbackMessage] = useState('');

  function handleFormClose() {
    setFeedbackMessage('');

    onClose();
  }

  function handleFormSubmit() {
    onSubmit(feedbackMessage);
  }

  function handleFeedbackMessageChange(event) {
    setFeedbackMessage(event.target.value);
  }

  return (
    <Dialog
      open={open}
      onClose={handleFormClose}
    >
      <DialogContent>
        <DialogContentText>
          Escreva anônimamente sobre o(a) collaborador(a)
          {' '}
          {collaboratorName}
        </DialogContentText>
        <TextareaAutosize
          autoFocus
          rowsMin={3}
          className={classes.feedbackMeesageInput}
          margin="dense"
          value={feedbackMessage}
          onChange={handleFeedbackMessageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormSubmit}>
          <Typography>
            SALVAR
          </Typography>
        </Button>
        <Button onClick={handleFormClose}>
          <Typography>
            CANCELAR
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CollaboratorFeedbackFormDialog.propTypes = propTypes;

export default CollaboratorFeedbackFormDialog;
