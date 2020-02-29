import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import LandingPage from './LandingPage';
import About from './About';
import Login from './Login';
import Register from './Register';

import './App.css';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <NavBar /> */}
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
};

export default App;
