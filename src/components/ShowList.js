import React, { Component } from 'react';
import { List, Avatar, Button, Spin, Rate, Tabs } from 'antd';
import Modal from './Modal';
import GeoTaggingModal from './GeoTaggingModal';
import CountDownTimer from './CountDownTimer';

import ax from 'axios';

import { baseURL } from '../config/constant';
import AssignedInfoModal from './AssignedInfoModal';

const TabPane = Tabs.TabPane;

const IconText = ({ type, text }) => (
  <span>
    {type} ₹{text}
  </span>
);

function callback(key) {
  console.log(key);
}

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
    ax.get(`${baseURL}/leads?token=${token}`).then(res => {
      callback(res.data.data.leads);
      this.setState({
        loading: false
      });
    });
  };

  goLive = (geoTagging, id) => {
    const token = localStorage.getItem('token');
    console.log(token);
    ax.post(`${baseURL}/mark_live?lead_id=${id}&token=${token}&geo_tag=${geoTagging}`).then(res => {
      const data = res.data.data.leads;
      console.log(data);

      this.setState({
        data
      });
    });
  };

  ///

  updateBasePrice = (id, price) => {
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
        <TabPane tab="On Hold" key="1">
          <h1>Leads on Hold</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item =>
              item.workflow_state === 'hold' ? (
                <List.Item
                  actions={[
                    <Modal text="Edit" data={item} text2="Base Price(₹):" updateBasePrice={newPrice => this.updateBasePrice(item.id, newPrice)} />,
                    <GeoTaggingModal
                      text="Go Live"
                      style={{
                        background: 'green',
                        border: '1px solid green',
                        color: 'white'
                      }}
                      data={item}
                      title="Do you want to use geo tagging ?"
                      goLive={geoTag => this.goLive(geoTag, item.id)}
                    />
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
        <TabPane tab="Escalated" key="2">
          <h1>Escalated Leads</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item =>
              item.workflow_state === 'escalated' ? (
                <List.Item>
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
                <List.Item actions={[<AssignedInfoModal text="Show Info" data={item} />]}>
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
