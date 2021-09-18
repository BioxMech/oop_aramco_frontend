import React from 'react';

import Header from './components/header';
import Dashboard from './components/dashboard';

class App extends React.Component {

  render() {

    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    )
  }
}

export default App;