import React, { Component } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/sidebar';

const { Header, Sider, Footer, Content } = Layout;

class MasterPage extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Header>header</Header>
          <Content>{this.props.children}</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MasterPage;
