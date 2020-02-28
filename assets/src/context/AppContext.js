import React, { Component } from 'react';
import axios from 'axios';
const todoAxios = axios.create();

todoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      user: JSON.parse(localStorage.getItem('user')) || {},
      token: localStorage.getItem('token') || '',
    };
  }

  componentDidMount() {
    // this.getTodos();
  }

  getTodos = () => {
    return todoAxios.get('/api/todo').then(response => {
      this.setState({ todos: response.data });
      return response;
    });
  };

  register = userInfo => {
    return todoAxios.post('/users/register', userInfo).then(response => {
      const { success, msg } = response.data;
      console.log(response.data);
      return response;
    });
  };

  authenticate = credentials => {
    return todoAxios.post('/users/authenticate', credentials).then(response => {
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
      todos: [],
      user: {},
      token: '',
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          getTodos: this.getTodos,
          register: this.register,
          authenticate: this.authenticate,
          logout: this.logout,
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
