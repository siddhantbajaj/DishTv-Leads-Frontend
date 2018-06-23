import React, { Component } from 'react';
import { Tag } from 'antd';
import ShowList from '../components/ShowList';

class Leads extends Component {
  render() {
    return (
      <div>
        <div>
          <div
            style={{
              position: 'absolute',
              right: '16px'
            }}
          >
            <Tag color="magenta">
              <span>Cost Per Lead: ₹{20}</span>
            </Tag>
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <ShowList />
        </div>
      </div>
    );
  }
}

export default Leads;
