import React, { Component } from 'react';
import { List, Avatar, Button, Spin, Rate, Tabs } from 'antd';
import Modal from './Modal';
import InfoModal from './InfoModal';
import GeoTaggingModal from './GeoTaggingModal';
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
  async componentDidMount() {
    await this.getFirstData(res => {
      this.setState({
        loading: false,
        data: res
      });
    });
    await this.getBids(_res => {
      this.setState({
        currentBid: _res
      });
    });
    await this.getInitialLeads(leads => {
      this.setState({
        assignedLeads: leads
      });
    });
    await this.getData(bids => {
      this.setState({ data: bids });
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

  ///

  createbid = (id, price) => {
    const token = localStorage.getItem('token');
    ax.post(`${baseURL}/create_bid?lead_id=${id}&token=${token}&price=${price}`).then(res => {
      const data = res.data.data.bids;
      console.log('createBids', data);
      this.setState({
        currentBid: data
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

    ax.get(`${baseURL}/bids?token=${token}`).then(res => {
      const data = res.data.data.bids;
      this.setState({
        currentBid: data
      });
    });

    ax.get(`${baseURL}/assigned_leads?token=${token}`).then(res => {
      console.log(res.data.data.assigned_leads);
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
              <List.Item
                actions={[
                  <Button
                    style={{
                      background: this.item.status === 'live' ? 'green' : 'red',
                      border: this.item.status === 'live' ? '1px solid green' : '1px solid red',
                      color: 'white'
                    }}
                  >
                    {this.item.status === 'live' ? 'Status: Live' : 'Status: Ended'}
                  </Button>
                ]}
              >
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
