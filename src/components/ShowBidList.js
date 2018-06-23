import React, { Component } from 'react';
import { List, Avatar, Button, Spin, Rate, Tabs } from 'antd';
import Modal from './Modal';
import InfoModal from './InfoModal';
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

class ShowBidList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    currentBid: [],
    assignedLeads: [],
    visible: false
  };
  componentDidMount() {
    this.getFirstData(res => {
      this.setState(
        {
          loading: false,
          data: res
        },
        () => {
          this.getBids(_res => {
            this.setState(
              {
                currentBid: _res
              },
              () => {
                this.getInitialLeads(leads => {
                  this.setState({
                    assignedLeads: leads
                  });
                });
              }
            );
          });
        }
      );
    });
  }

  getFirstData = callback => {
    const token = localStorage.getItem('token');
    this.setState({
      loading: true
    });
    ax.get(`${baseURL}/active_leads?token=${token}`).then(res => {
      callback(res.data.data.leads);
      this.setState({
        loading: false
      });
    });
  };

  getInitialLeads = callback => {
    const token = localStorage.getItem('token');
    this.setState({
      loading: true
    });
    ax.get(`${baseURL}/assigned_leads?token=${token}`).then(res => {
      console.log(res.data.data);
      callback(res.data.data.assigned_leads);
      this.setState({
        loading: false
      });
    });
  };

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

  getBids = callback => {
    const token = localStorage.getItem('token');
    this.setState({
      loading: true
    });
    ax.get(`${baseURL}/bids?token=${token}`).then(res => {
      callback(res.data.data.bids);
      this.setState({
        loading: false
      });
    });
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
    ax.post(`${baseURL}/create_bid?lead_id=${id}&token=${token}&price=${price}`).then(res => {
      const data = res.data.data.leads;

      this.setState({
        data
      });
    });
  };

  leadTimeOutAndGetAssignedLeads = id => {
    const token = localStorage.getItem('token');
    ax.post(`${baseURL}/timeout?token=${token}&lead_id=${id}`).then(res => {
      const data = res.data.data.leads;
      this.setState({
        data
      });
    });
    ax.post(`${baseURL}/assigned_leads?token=${token}`).then(res => {
      const data = res.data.data.assigned_leads;
      this.setState({
        assignedLeads: data
      });
    });
  };

  render() {
    const { loading, loadingMore, showLoadingMore, data, currentBid, assignedLeads } = this.state;
    console.log(currentBid);
    const loadMore = showLoadingMore ? <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>{loadingMore && <Spin />}</div> : null;
    return (
      <Tabs onChange={callback}>
        <TabPane tab="Active" key="1">
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
                      <CountDownTimer targetDate={item.timeout} interval={1000} callback={() => this.leadTimeOutAndGetAssignedLeads(item.id)} />
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
        <TabPane tab="Assigned" key="2">
          <h1>Assigned Leads</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={assignedLeads}
            renderItem={item =>
              item.workflow_state === 'assigned' ? (
                <List.Item actions={[<InfoModal text="Show Info" data={item} />]}>
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
        <TabPane tab="My Bids" key="3">
          <h1>My Bids</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={currentBid}
            renderItem={item => (
              <List.Item actions={[<Modal text="Edit Bid" data={item} text2="Place Bid(₹):" updateBasePrice={newPrice => this.createbid(item.id, newPrice)} />]}>
                <div>
                  <div style={{ textAlign: 'right' }}>{[<IconText type="Price" text={item.price} />]}</div>
                  <div />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default ShowBidList;
