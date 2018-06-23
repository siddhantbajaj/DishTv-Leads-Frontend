import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../pages/home';
import Leads from '../pages/leads';
import Distributer from '../pages/distributers';

import Sidebar from './sidebar';
import AppHeader from './Header';

const { Header, Footer, Content } = Layout;

class MainLayout extends Component {
  render() {
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header className="App-header">
              <AppHeader />
            </Header>
            <Content className="App-body">
              <Switch>
                <Route exact component={Home} path="/" />
                <Route component={Leads} path="/leads" />
                <Route component={Distributer} path="/distributer" />
              </Switch>
            </Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
