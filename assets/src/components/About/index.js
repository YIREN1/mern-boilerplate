import React from 'react';
import { Button } from 'antd';
import LoginModal from '../Login';
import RegisterModal from '../Register';
import { withContext } from '../../context/AppContext';

class AboutPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Login
        </Button>
        <LoginModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
        />
        <br />
        {this.props.secret}
        {/* <RegisterModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
        /> */}
      </div>
    );
  }
}
export default withContext(AboutPage);
