import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Overview from './pages/overview';

class App extends React.Component {

  render() {

    return (
      <div >
        <Header />
        <Switch>
          <Route path="/thailand/:type" component={Dashboard} />
          <Route path="/china/:type" component={Dashboard} />
          <Route path="/overview" component={Overview} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App;