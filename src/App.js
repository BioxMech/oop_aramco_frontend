import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home';
import China from './pages/china';
import Thailand from './pages/thailand';
import Overview from './pages/overview';
import ThailandComposite from './pages/thailandComposite';
import ThailandMaterial from './pages/thailandMaterial';
import Store from './components/store/Store';
import DownloadChina from './pages/downloadsChina';
import DownloadThailand from './pages/downloadsThailand';

class App extends React.Component {

  render() {

    return (
      <Store>
        <Header />
        <Switch>
          <Route path="/thailand_composite" component={ThailandComposite} />
          <Route path="/thailand_material" component={ThailandMaterial} />
          <Route path="/thailand/:type" component={Thailand} />
          <Route path="/downloads/china" component={DownloadChina} />
          <Route path="/downloads/thailand" component={DownloadThailand} />
          <Route path="/china" component={China} />
          <Route path="/overview" component={Overview} />
          <Route path="/" component={Home} />
        </Switch>
      </Store>
    )
  }
}

export default App;