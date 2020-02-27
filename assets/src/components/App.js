import React from 'react';
import { Route, Switch } from 'react-router-dom';

import logo from '../logo.svg';
// import Home from './Home';
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from 'antd';

import './App.css';

const { Option } = Select;

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <NavBar /> */}
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
};

export default App;
