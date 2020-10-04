import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { CollaboratorsListPage, CollaboratorDetailsPage } from './pages';
import { theme } from './global/theme/global.theme';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route
            exact
            path="/"
            component={CollaboratorsListPage}
          />
          <Route exact path="/collaborators/:collaboratorId">
            {(routeParams) => (
              <CollaboratorDetailsPage
                collaboratorId={routeParams.match.params.collaboratorId}
              />
            )}
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
