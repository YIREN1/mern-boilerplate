/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withContext } from '../../../context/AppContext';

import LoginModal from '../../Login';
import RegisterModal from '../../Register';

class RightMenu extends React.Component {
  state = {
    loginVisible: false,
    registerVisible: false,
  };
  showLoginModal = () => {
    this.setState({
      loginVisible: true,
    });
  };

  showRegisterModal = () => {
    this.setState({
      registerVisible: true,
    });
  };

  logoutHandler = () => {
    this.props.logout();
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancel = () => {
    console.log('can');
    this.setState({ loginVisible: false, registerVisible: false });
  };
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated()) {
      return (
        <Menu mode={this.props.mode}>
          <Menu.Item key="mail">
            <a onClick={this.showLoginModal}>Signin</a>
          </Menu.Item>
          <LoginModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.loginVisible}
            onCancel={this.handleCancel}
          />
          <Menu.Item key="app">
            <a onClick={this.showRegisterModal}>Signup</a>
          </Menu.Item>
          <RegisterModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.registerVisible}
            onCancel={this.handleCancel}
          />
        </Menu>
      );
    } else {
      return (
        <Menu mode={this.props.mode}>
          <Menu.Item key="logout">
            <a onClick={this.logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      );
    }
  }
}

export default withContext(RightMenu);
