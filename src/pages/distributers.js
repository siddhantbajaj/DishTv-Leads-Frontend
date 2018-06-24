import React, { Component } from 'react';
import ShowBidList from '../components/ShowBidList';

class Distributer extends Component {
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <ShowBidList />
      </div>
    );
  }
}

export default Distributer;
