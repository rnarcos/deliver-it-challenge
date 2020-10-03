import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CollaboratorsListPage } from './pages';
import { GlobalStyles } from './global/styles/global.styles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route
          exact
          path="/"
          component={CollaboratorsListPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
