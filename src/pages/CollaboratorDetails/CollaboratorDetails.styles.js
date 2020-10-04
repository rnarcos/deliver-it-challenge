export default (theme) => ({
  container: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '50%',
    padding: 20,
    margin: 30,
  },
  collaboratorIdentificationWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  arrowBackButton: {
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
  collaboratorName: {
    fontSize: 22,
    fontWeight: 600,
  },
  separator: {
    width: '100%',
    height: theme.spacing(0.2),
    backgroundColor: '#363636',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  collaboratorDetailsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
  },
  collaboratorFeedbackContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  collaboratorFeedbackTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  collaboratorFeedbackTitle: {
    fontSize: 19,
    fontWeight: 600,
  },
  collaboratorFeedbackListContainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'stretch',
    flexWrap: 'wrap',
  },
  collaboratorFeedbackItem: {
    flex: '0 46%',
    margin: '2%',
  },
});
