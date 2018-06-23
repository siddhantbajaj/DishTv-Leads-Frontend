import React, { Component } from 'react';
import { List, Avatar, Button, Spin, Rate, Tabs } from 'antd';
import Modal from './Modal';
import CountDownTimer from './CountDownTimer';

import ax from 'axios';

import { baseURL } from '../config/constant';

const TabPane = Tabs.TabPane;

const IconText = ({ type, text }) => (
  <span>
    {type} ₹{text}
  </span>
);

function callback(key) {
  console.log(key);
}

// const data = [
//   {
//     id: 'sdfdsgdfhfgafsdfdgdfd',
//     source: 'web form',
//     rating: 1.5,
//     location: 'CoWORKs',
//     basePrice: 30,
//     name: 'John',
//     image: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
//     workFlow_state: 'hold'
//   },
//   {
//     id: 'ejjfhkjh3kjwhkdsfkjdfjh',
//     source: 'missed call',
//     rating: 4.5,
//     location: 'CoWORKs',
//     basePrice: 200,
//     name: 'Jenny',
//     image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
//     workFlow_state: 'escalated'
//   },
//   {
//     id: 'ejjfhkjh3kjwhkdsfkjdfjh',
//     source: 'missed call',
//     rating: 2.5,
//     location: 'CoWORKs',
//     basePrice: 150,
//     name: 'Issue',
//     image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
//     workFlow_state: 'active',
//     end: 'Sat, 23 Jun 2018 21:56:48 +0530'
//   },
//   {
//     id: 'sdfdsgdfhfgafsdfdgdfd',
//     source: 'web form',
//     rating: 3.5,
//     location: 'CoWORKs',
//     basePrice: 140,
//     name: 'John',
//     image: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
//     workFlow_state: 'assigned'
//   },
//   {
//     id: 'ejjfhkjh3kjwhkdsfkjdfjh',
//     source: 'missed call',
//     rating: 0.5,
//     location: 'CoWORKs',
//     basePrice: 50,
//     name: 'Jenny',
//     image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
//     workFlow_state: 'escalated'
//   },
//   {
//     id: 'ejjfhkjh3kjwhkdsfkjdfjh',
//     source: 'missed call',
//     rating: 4.5,
//     location: 'CoWORKs',
//     basePrice: 200,
//     name: 'Jenny',
//     image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
//     workFlow_state: 'active',
//     end: 'June 23, 2018, 22:49'
//   },
//   {
//     id: 'sdfdsgdfhfgafsdfdgdfd',
//     source: 'web form',
//     rating: 0.5,
//     location: 'CoWORKs',
//     basePrice: 40,
//     name: 'Maria',
//     image: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
//     workFlow_state: 'hold'
//   },
//   {
//     id: 'ejjfhkjh3kjwhkdsfkjdfjh',
//     source: 'missed call',
//     rating: 3.5,
//     location: 'CoWORKs',
//     basePrice: 100,
//     name: 'Jenny',
//     image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
//     workFlow_state: 'escalated'
//   },
//   {
//     id: 'ejjfhkjh3kjwhkdsfkjdfjh',
//     source: 'missed call',
//     rating: 4.5,
//     location: 'CoWORKs',
//     basePrice: 200,
//     name: 'Jenny',
//     image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
//     workFlow_state: 'active',
//     end: 'June 23, 2018, 20:37'
//   }
// ];

class ShowList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    visible: false
  };
  componentDidMount() {
    this.getData(res => {
      this.setState(
        {
          loading: false,
          data: res
        },
        () => {
          console.log(this.state.data);
        }
      );
    });
  }
  getData = callback => {
    const token = localStorage.getItem('token');
    this.setState({
      loading: true
    });
    setInterval(() => {
      ax.get(`${baseURL}/active_leads?token=${token}`).then(res => {
        callback(res.data.data.leads);
        this.setState({
          loading: false
        });
      });
    }, 5000);
  };

  goLive = id => {
    const token = localStorage.getItem('token');
    console.log(token);
    ax.post(`${baseURL}/mark_live?lead_id=${id}&token=${token}`).then(res => {
      const data = res.data.data.leads;
      console.log(data);

      this.setState({
        data
      });
    });
  };

  ///

  createbid = (id, price) => {
    const token = localStorage.getItem('token');
    ax.post(`${baseURL}/update_lead?lead_id=${id}&token=${token}&base_price=${price}`).then(res => {
      const data = res.data.data.leads;

      this.setState({
        data
      });
    });
  };

  leadTimeOut = id => {
    const token = localStorage.getItem('token');
    ax.post(`${baseURL}/timeout?token=${token}&lead_id=${id}`).then(res => {
      const data = res.data.data.leads;
      this.setState({
        data
      });
    });
  };

  render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>{loadingMore && <Spin />}</div> : null;
    return (
      <Tabs onChange={callback}>
        <TabPane tab="Active" key="3">
          <h1>Active Leads</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item =>
              item.workflow_state === 'active' ? (
                <List.Item
                  actions={[
                    <Modal text="Bid" data={item} text2="Place Bid(₹):" updateBasePrice={newPrice => this.createbid(item.id, newPrice)} />,
                    <Button onClick={() => {}} type="primary" style={{ width: '195px' }}>
                      <CountDownTimer targetDate={item.timeout} interval={1000} callback={() => this.leadTimeOut(item.id)} />
                    </Button>
                  ]}
                >
                  <List.Item.Meta avatar={<Avatar src={item.image} />} title={<a href="https://ant.design">{item.name}</a>} description={item.location} />
                  <div>
                    <div>
                      <Rate allowHalf defaultValue={item.rating} />
                    </div>
                    <div style={{ textAlign: 'right' }}>{[<IconText type="Base Price" text={item.base_price} />]}</div>
                    <div />
                  </div>
                </List.Item>
              ) : (
                <span />
              )
            }
          />
        </TabPane>
        <TabPane tab="Assigned" key="4">
          <h1>Assigned Leads</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item =>
              item.workflow_state === 'assigned' ? (
                <List.Item
                  actions={[
                    <Button onClick={() => {}} type="primary">
                      Show Info
                    </Button>
                  ]}
                >
                  <List.Item.Meta avatar={<Avatar src={item.image} />} title={<a href="https://ant.design">{item.name}</a>} description={item.location} />
                  <div>
                    <div>
                      <Rate allowHalf defaultValue={item.rating} />
                    </div>
                    <div style={{ textAlign: 'right' }}>{[<IconText type="Base Price" text={item.base_price} />]}</div>
                    <div />
                  </div>
                </List.Item>
              ) : (
                <span />
              )
            }
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default ShowList;
