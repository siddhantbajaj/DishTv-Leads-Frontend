import React from 'react';
import { Form, Card, Tabs, Icon } from 'antd';
import NormalLoginForm from '../components/LoginFormDistribution';
import logo from '../images/dishathon_logo.svg';

const TabPane = Tabs.TabPane;
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class LoginDistributers extends React.Component {
  render() {
    return (
      <div className="Login-form">
        <img src={logo} style={{ width: '255px' }} />
        <div
          style={{
            fontSize: '31px',
            fontWeight: 'bold',
            marginTop: '-43px'
          }}
        >
          PARTENERS
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

export default LoginDistributers;
