import React, { Component } from 'react';
import { Input } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: 'YOYOYOYO'
    };
  }

  logOutButton() {
    //
  }

  render() {
    return (
      <div>
        <p> This is Home</p>
      </div>
    );
  }
}

export default Home;
