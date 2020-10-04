export default (theme) => ({
  collaboratorDataWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  collaboratorDataTitle: {
    fontWeight: 600,
    fontSize: 18,
  },
  collaboratorDataSeparator: {
    backgroundColor: '#3B4D68',
    width: '50%',
    height: theme.spacing(0.3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  collaboratorDataValue: {
    fontSize: 15,
  },
});
