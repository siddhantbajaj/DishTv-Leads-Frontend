import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Form, Icon, Input, Button, Checkbox, Spin } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  state = {
    loading: false,
    error: false
  };

  handleSubmit = e => {
    console.log(this.props);
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.setState({
          loading: true,
          error: null
        });
        setTimeout(() => {
          localStorage.setItem('token', '786r5etyfugukhgmfnbdsvfertdyfh');
          setTimeout(() => {
            this.setState(
              {
                loading: false
              },
              () => {
                this.props.history.push('/home');
              }
            );
          }, 500);
        }, 1000);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.loading}>
        {this.state.error ? <Alert description={this.state.error.description} type="error" showIcon /> : <div />}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
          </FormItem>
          <FormItem>
            {' '}
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.state.loading}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default withRouter(NormalLoginForm);
