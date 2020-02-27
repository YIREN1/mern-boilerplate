import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import logo from '../logo.svg';
import Home from './Home';
import LandingPage from './LandingPage';
import About from './About';

import { Form, Select, InputNumber, DatePicker, Slider, Button } from 'antd';

import './App.css';

const { Option } = Select;

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <NavBar /> */}
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {/* <Route exact path="/login" component={Auth(LoginPage, false)} /> */}
          <Route exact path="/about" component={About} />
          {/* <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
};

export default App;
