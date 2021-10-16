import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import ImportExport from './pages/ImportExport';
import Overview from './pages/overview';
import Store from './components/store/Store';

class App extends React.Component {

  render() {

    return (
      <Store>
        <Header />
        <Switch>
          <Route path="/thailand/:type" component={Dashboard} />
          <Route path="/china/importExport" component={ImportExport} />
          <Route path="/overview" component={Overview} />
          <Route path="/" component={Home} />
        </Switch>
      </Store>
    )
  }
}

export default App;