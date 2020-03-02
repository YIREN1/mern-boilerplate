import React, { Component } from 'react';
import axios from 'axios';
const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      secret: '',
      user: JSON.parse(localStorage.getItem('user')) || {},
      token: localStorage.getItem('token') || '',
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    return authAxios.get('/users/profile').then(response => {
      console.log(response.data);
      this.setState({ secret: response.data.msg });
      return response;
    });
  };

  register = userInfo => {
    return authAxios.post('/users/register', userInfo).then(response => {
      const { success, msg } = response.data;
      console.log(response.data);
      return response;
    });
  };

  authenticate = credentials => {
    return authAxios.post('/users/authenticate', credentials).then(response => {
      //  console.log(response.data, 'response.data');
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({
        user,
        token,
      });
      return response;
    });
  };

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({
      secret: '',
      user: {},
      token: '',
    });
  };

  isAuthenticated = () => {
    return !!this.state.token;
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          getProfile: this.getProfile,
          register: this.register,
          authenticate: this.authenticate,
          logout: this.logout,
          isAuthenticated: this.isAuthenticated,
          ...this.state,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AppContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AppContext.Consumer>
    );
  };
};
