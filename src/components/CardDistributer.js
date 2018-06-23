import React, { Component } from 'react';
import { Card } from 'antd';

class CardDistributer extends Component {
  render() {
    return (
      <Card
        title={this.props.data.id}
        extra={<a href="#">More</a>}
        style={{
          width: 300,
          margin: '23px',
          padding: '18px'
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}

export default CardDistributer;
