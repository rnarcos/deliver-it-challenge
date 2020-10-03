import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CollaboratorsListPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            component={CollaboratorsListPage}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
