import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../images/dishathon_logo.svg';

const { Sider } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { location } = this.props;
    const role = localStorage.getItem('role');
    console.log(location.pathname);
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} breakpoint="sm">
        <div className="logo">
          <img className={this.state.collapsed === true ? 'App-logo-collapsed' : 'App-logo'} src={logo} style={{ width: '166px' }} />
          <div
            style={{
              marginTop: '-16px',
              marginBottom: '13px',
              fontSize: '24px'
            }}
          >
            {this.state.collapsed === false ? role === 'admin' ? <div>LEADS</div> : <div>PARTNERS</div> : ''}
          </div>
        </div>
        <Menu defaultSelectedKeys={['1']} mode="inline" selectedKeys={[location.pathname]}>
          {role === 'admin' && (
            <Menu.Item key="/">
              <NavLink to="/">
                <div style={{ float: 'left' }}>
                  <Icon type="pie-chart" />
                  <span>Home</span>
                </div>
              </NavLink>
            </Menu.Item>
          )}
          {role === 'admin' && (
            <Menu.Item key="/leads">
              <NavLink to="/leads">
                <div style={{ float: 'left' }}>
                  <Icon type="desktop" />
                  <span>Leads</span>
                </div>
              </NavLink>
            </Menu.Item>
          )}
          {role === 'distribution' && (
            <Menu.Item key="/distributer">
              <NavLink to="/distributer">
                <div style={{ float: 'left' }}>
                  <Icon type="idcard" />
                  <span>Distributer</span>
                </div>
              </NavLink>
            </Menu.Item>
          )}
          {/* <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item> */}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
