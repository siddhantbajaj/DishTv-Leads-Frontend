import React, { Component } from 'react';
import { Avatar, Menu, Dropdown, Icon, Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import user from '../images/user.png';

const menu = name => (
  <Menu>
    <Menu.Item key="0">Signed in as Shubham Singh</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">About</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="4">
      <Link
        to="/login"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }}
      >
        Sign Out
      </Link>
    </Menu.Item>
  </Menu>
);

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Dropdown overlay={menu(this.props.name)} trigger={['click']} placement="bottomRight">
          <div className="header-avatar">
            <img src={user} style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt="YY" />
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(Header);
