import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { CollaboratorsListPage } from './pages';
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
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
