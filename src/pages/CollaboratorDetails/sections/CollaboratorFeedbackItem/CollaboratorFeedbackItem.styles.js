export default (theme) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  feedbackContentWrapper: {
    flex: '9.99 0.01',
  },
  feedbackActionsWrapper: {
    flex: '0.01 9.99',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  feedbackLikesWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackLikes: {
    marginRight: theme.spacing(1),
  },
  feedbackActionIcon: {
    fontSize: 19,
  },
});
