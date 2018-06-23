import React from 'react';
import { Form, Card, Tabs, Icon } from 'antd';
import NormalLoginForm from '../components/LoginForm';
import logo from '../images/dishathon_logo.svg';

const TabPane = Tabs.TabPane;
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends React.Component {
  render() {
    return (
      <div className="Login-form">
        <img src={logo} style={{ width: '166px' }} />
        <div style={{ position: 'relative', marginLeft: '-38px' }}>
          <span style={{ fontSize: '31px' }}>DISHTV</span>{' '}
          <b
            style={{
              position: 'absolute',
              top: '14px',
              left: '111px'
            }}
          >
            LEADS
          </b>
        </div>
        <Card style={{ width: 300 }}>
          <Tabs size="default" defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <Icon type="login" />Login
                </span>
              }
              key="1"
            >
              <WrappedNormalLoginForm />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default Login;
