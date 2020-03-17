import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/style.css';
import { ApiDataProvider } from "./context/ApiData.context";
import Header from './Header';
import Content from './Content';
import CompanyInfo from './CompanyInfo';

const App = () => {
  return (
    <ApiDataProvider>

      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <div className="container">
              <Content />
            </div>
          </Route>
          <Route path="/company/:id" component={CompanyInfo} />
        </Switch>
      </BrowserRouter>

    </ApiDataProvider>
  );
}

export default App;
