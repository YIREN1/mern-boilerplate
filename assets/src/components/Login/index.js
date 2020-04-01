import React from 'react';
import { Input, Button, Checkbox, Modal, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './style.css';
import { withContext } from '../../context/AppContext';
class NormalLoginForm extends React.Component {
  onFinish = async values => {
    await this.props.authenticate(values);
  };

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal visible={visible} title="login" footer={null} onCancel={onCancel}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withContext(NormalLoginForm);
