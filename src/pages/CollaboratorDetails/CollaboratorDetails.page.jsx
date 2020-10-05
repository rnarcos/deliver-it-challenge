import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  makeStyles,
  Paper,
  IconButton,
  CircularProgress,
  Avatar,
  Typography,
  Button,
  Tooltip,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Add, ArrowBack } from '@material-ui/icons';
import { mutate as globallyMutate } from 'swr';
import api from '../../global/api';
import { useFetch } from '../../hooks';
import { Paginator } from '../../components';
import CollaboratorData from './sections/CollaboratorData/CollaboratorData.section';
import CollaboratorFeedbackItem from './sections/CollaboratorFeedbackItem/CollaboratorFeedbackItem.section';
import CollaboratorFeedbackFormDialog from './sections/CollaboratorFeedbackFormDialog/CollaboratorFeedbackFormDialog.section';
import styles from './CollaboratorDetails.styles';

const FEEDBACKS_PER_PAGE = 20;

const useStyles = makeStyles(styles);

const FeedbackActionErrorsEnum = {
  LIKE: 'LIKE',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

function CollaboratorDetailsPage() {
  const classes = useStyles();
  const history = useHistory();
  const { collaboratorId } = useParams();

  const collaboratorURL = `collaborator/${collaboratorId}`;
  const collaboratorFeedbackURL = `collaborator/${collaboratorId}/feedback`;

  const [
    isFeedbackFormDialogOpen,
    setIsFeedbackFormDialogOpen,
  ] = useState(false);
  const [
    currentFeedbackActionError,
    setCurrentFeedbackActionError,
  ] = useState(null);

  const {
    data: collaboratorDetailsData,
  } = useFetch(collaboratorURL);
  const {
    data: collaboratorFeedbackData,
    mutate: mutateCollaboratorFeedbackData,
  } = useFetch(collaboratorFeedbackURL);

  const feedbackErrorMessageRef = useRef(null);
  useEffect(() => {
    switch (currentFeedbackActionError) {
      case FeedbackActionErrorsEnum.ADD: {
        feedbackErrorMessageRef
          .current = 'Houve um erro ao adicionar a sua mensagem';
        break;
      }
      case FeedbackActionErrorsEnum.LIKE: {
        feedbackErrorMessageRef
          .current = 'Houve um erro ao registrar a aprovação desse comentário';
        break;
      }
      case FeedbackActionErrorsEnum.REMOVE: {
        feedbackErrorMessageRef
          .current = 'Houve um erro ao remover esse comentário';
        break;
      }
      default: {
        feedbackErrorMessageRef
          .current = null;
      }
    }
  }, [currentFeedbackActionError]);

  function handleOpenFeedbackFormDialog() {
    setIsFeedbackFormDialogOpen(true);
  }

  function handleCloseFeedbackFormDialog() {
    setIsFeedbackFormDialogOpen(false);
  }

  function handleCloseFeedbackError() {
    setCurrentFeedbackActionError(null);
  }

  function handleBackPress() {
    history.goBack();
  }

  async function onFeedbackLike({
    feedbackId,
    newLikesQuantity,
  }) {
    const collaboratorFeedbackDataPriorToOptimisticUpdate = collaboratorFeedbackData;

    try {
      const optimisticallyUpdatedCollaboratorFeedbacksData = collaboratorFeedbackData
        .map((feedback) => ({
          ...feedback,
          like: (feedbackId === feedback.id)
            ? newLikesQuantity
            : feedback.like,
        }));

      mutateCollaboratorFeedbackData(
        optimisticallyUpdatedCollaboratorFeedbacksData,
        false,
      );
      globallyMutate(
        collaboratorFeedbackURL,
        optimisticallyUpdatedCollaboratorFeedbacksData,
        false,
      );

      await api.put(
        `${collaboratorFeedbackURL}/${feedbackId}`,
        { like: newLikesQuantity },
      );
    } catch {
      setCurrentFeedbackActionError(FeedbackActionErrorsEnum.LIKE);
      mutateCollaboratorFeedbackData(
        collaboratorFeedbackDataPriorToOptimisticUpdate,
        false,
      );
      globallyMutate(
        collaboratorFeedbackURL,
        collaboratorFeedbackDataPriorToOptimisticUpdate,
        false,
      );
    }
  }

  function onFeedbackRemove({ feedbackId }) {
    const collaboratorFeedbackDataPriorToOptimisticUpdate = collaboratorFeedbackData;

    try {
      const optimisticallyUpdatedCollaboratorFeedbacksData = collaboratorFeedbackData
        .filter((feedback) => feedbackId !== feedback.id);

      mutateCollaboratorFeedbackData(
        optimisticallyUpdatedCollaboratorFeedbacksData,
        false,
      );
      globallyMutate(
        collaboratorFeedbackURL,
        optimisticallyUpdatedCollaboratorFeedbacksData,
        false,
      );

      api.delete(
        `collaborator/${collaboratorId}/feedback/${feedbackId}`,
      );
    } catch {
      setCurrentFeedbackActionError(FeedbackActionErrorsEnum.REMOVE);
      mutateCollaboratorFeedbackData(
        collaboratorFeedbackDataPriorToOptimisticUpdate,
        false,
      );
      globallyMutate(
        collaboratorFeedbackURL,
        collaboratorFeedbackDataPriorToOptimisticUpdate,
        false,
      );
    }
  }

  async function onFeedbackAdd(feedbackMessage) {
    try {
      await api.post(
        collaboratorFeedbackURL,
        {
          collaboratorId,
          message: feedbackMessage,
          like: 0,
          createdAt: moment().utc().format(),
        },
      );

      globallyMutate(collaboratorFeedbackURL);
    } catch {
      setCurrentFeedbackActionError(FeedbackActionErrorsEnum.ADD);
    } finally {
      handleCloseFeedbackFormDialog();
    }
  }

  return (
    <div className={classes.container}>
      <CollaboratorFeedbackFormDialog
        open={isFeedbackFormDialogOpen}
        collaboratorName={collaboratorDetailsData?.name ?? ''}
        onSubmit={onFeedbackAdd}
        onClose={handleCloseFeedbackFormDialog}
      />
      <Paper className={classes.paper}>
        {!collaboratorDetailsData ? (
          <div className={classes.loadingIndicatorWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={classes.collaboratorIdentificationWrapper}>
              <IconButton
                className={classes.arrowBackButton}
                onClick={handleBackPress}
              >
                <ArrowBack />
              </IconButton>
              <Avatar
                className={classes.avatar}
                src={collaboratorDetailsData.avatar}
              />
              <Typography
                variant="h1"
                className={classes.collaboratorName}
              >
                {collaboratorDetailsData.name}
              </Typography>
            </div>
            <div className={classes.separator} />
            <div className={classes.collaboratorDetailsContainer}>
              <CollaboratorData
                label="Empresa"
                value={collaboratorDetailsData.company}
              />
              <CollaboratorData
                label="Cargo"
                value={collaboratorDetailsData.role}
              />
            </div>
            <div className={classes.collaboratorFeedbackContainer}>
              <div className={classes.collaboratorFeedbackTitleWrapper}>
                <Typography variant="h2" className={classes.collaboratorFeedbackTitle}>
                  Feedbacks
                </Typography>
                <Tooltip title="Adicionar feedback">
                  <Button onClick={handleOpenFeedbackFormDialog}>
                    <Add />
                  </Button>
                </Tooltip>
              </div>
              {!collaboratorDetailsData ? (
                <div className={classes.loadingIndicatorWrapper}>
                  <CircularProgress />
                </div>
              ) : (
                <Paginator
                  className={classes.collaboratorFeedbackListContainer}
                  perPage={FEEDBACKS_PER_PAGE}
                  items={collaboratorFeedbackData}
                  keyExtractor={({ item }) => item.id}
                  renderItem={({ item }) => (
                    <CollaboratorFeedbackItem
                      className={classes.collaboratorFeedbackItem}
                      id={item.id}
                      collaboratorId={item.collaboratorId}
                      createdAt={item.createdAt}
                      like={item.like}
                      message={item.message}
                      onFeedbackLike={onFeedbackLike}
                      onFeedbackRemove={onFeedbackRemove}
                    />
                  )}
                />
              )}
            </div>
          </>
        )}
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!currentFeedbackActionError}
        autoHideDuration={6000}
        onClose={handleCloseFeedbackError}
      >
        <Alert severity="error" onClose={handleCloseFeedbackError}>
          {feedbackErrorMessageRef.current}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CollaboratorDetailsPage;
