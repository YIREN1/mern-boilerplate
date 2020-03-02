import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import About from './About';
import NavBar from './NavBar/NavBar';
import './App.css';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
};

export default App;
