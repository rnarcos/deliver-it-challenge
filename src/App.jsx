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
          <Route
            exact
            path="/collaborators/:collaboratorId"
            component={CollaboratorDetailsPage}
          />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
