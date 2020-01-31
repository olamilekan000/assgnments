import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthContextProvider from './contexts/SigninContext';

import Login from './components/Login';
import History from './components/History';
import Compare from './components/Compare';
import UploadFileContextProvider from './contexts/Uploadfile';
import SingleAssignment from './components/SingleAssignment';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/history" component={History} />
          <Route exact path="/assignment/:id" component={SingleAssignment} />
          <UploadFileContextProvider>
            <Route exact path="/compare" component={Compare} />
          </UploadFileContextProvider>
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
