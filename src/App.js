import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './components/home';
import Dashboard from './components/dashboard';

class App extends React.Component {

  render() {

    return (
      <div >
        <Header />
        <Switch>
          <Route path="/thailand/:type" component={Dashboard} />
          <Route path="/china/:type" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App;