import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home';
import China from './pages/china';
import Thailand from './pages/thailand';
import Overview from './pages/overview';
import ThailandComposite from './pages/thailandComposite';
import Store from './components/store/Store';

class App extends React.Component {

  render() {

    return (
      <Store>
        <Header />
        <Switch>
          <Route path="/thailand_composite" component={ThailandComposite} />
          <Route path="/thailand/:type" component={Thailand} />
          <Route path="/china" component={China} />
          <Route path="/overview" component={Overview} />
          <Route path="/" component={Home} />
        </Switch>
      </Store>
    )
  }
}

export default App;