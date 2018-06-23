import React, { Component } from 'react';
import { List, Avatar, Button, Spin, Rate, Tabs } from 'antd';

import reqwest from 'reqwest';
const TabPane = Tabs.TabPane;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const IconText = ({ type, text }) => (
  <span>
    {type} ₹{text}
  </span>
);

function callback(key) {
  console.log(key);
}

const data = [
  {
    id: 'sdfdsgdfhfgafsdfdgdfd',
    source: 'web form',
    rating: 0.5,
    location: 'CoWORKs',
    basePrice: 40,
    name: 'Maria',
    image: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
    workFlow_state: 'hold'
  },
  {
    id: 'ejjfhkjh3kjwhkdsfkjdfjh',
    source: 'missed call',
    rating: 3.5,
    location: 'CoWORKs',
    basePrice: 100,
    name: 'Jenny',
    image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
    workFlow_state: 'escalated'
  },
  {
    id: 'ejjfhkjh3kjwhkdsfkjdfjh',
    source: 'missed call',
    rating: 4.5,
    location: 'CoWORKs',
    basePrice: 200,
    name: 'Jenny',
    image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
    workFlow_state: 'active'
  },
  {
    id: 'sdfdsgdfhfgafsdfdgdfd',
    source: 'web form',
    rating: 0.5,
    location: 'CoWORKs',
    basePrice: 40,
    name: 'Maria',
    image: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
    workFlow_state: 'assigned'
  },
  {
    id: 'ejjfhkjh3kjwhkdsfkjdfjh',
    source: 'missed call',
    rating: 3.5,
    location: 'CoWORKs',
    basePrice: 100,
    name: 'Jenny',
    image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
    workFlow_state: 'escalated'
  },
  {
    id: 'ejjfhkjh3kjwhkdsfkjdfjh',
    source: 'missed call',
    rating: 4.5,
    location: 'CoWORKs',
    basePrice: 200,
    name: 'Jenny',
    image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
    workFlow_state: 'active'
  },
  {
    id: 'sdfdsgdfhfgafsdfdgdfd',
    source: 'web form',
    rating: 0.5,
    location: 'CoWORKs',
    basePrice: 40,
    name: 'Maria',
    image: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
    workFlow_state: 'hold'
  },
  {
    id: 'ejjfhkjh3kjwhkdsfkjdfjh',
    source: 'missed call',
    rating: 3.5,
    location: 'CoWORKs',
    basePrice: 100,
    name: 'Jenny',
    image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
    workFlow_state: 'escalated'
  },
  {
    id: 'ejjfhkjh3kjwhkdsfkjdfjh',
    source: 'missed call',
    rating: 4.5,
    location: 'CoWORKs',
    basePrice: 200,
    name: 'Jenny',
    image: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png',
    workFlow_state: 'active'
  }
];

class ShowList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: []
  };
  componentDidMount() {
    this.getData(res => {
      this.setState({
        loading: false,
        data: res
      });
    });
  }
  getData = callback => {
    setTimeout(() => {
      callback(data);
    }, 500);
  };
  onLoadMore = () => {
    this.setState({
      loadingMore: true
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          loadingMore: false
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        }
      );
    });
  };
  render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>{loadingMore && <Spin />}</div> : null;
    return (
      <Tabs onChange={callback} type="card">
        <TabPane tab="On Hold" key="1">
          <h1>Leads on Hold</h1>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item =>
              item.workFlow_state === 'hold' ? (
                <List.Item
                  actions={[
                    <Button onClick={() => {}}>Edit</Button>,
                    <Button
                      onClick={() => {}}
                      style={{
                        background: 'green',
                        border: '1px solid green',
                        color: 'white'
                      }}
                    >
                      Go Live
                    </Button>
                  ]}
                >
                  <List.Item.Meta avatar={<Avatar src={item.image} />} title={<a href="https://ant.design">{item.name}</a>} description={item.location} />
                  <div>
                    <div>
                      <Rate allowHalf defaultValue={item.rating} />
                    </div>
                    <div style={{ textAlign: 'right' }}>{[<IconText type="Base Price" text={item.basePrice} />]}</div>
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
              item.workFlow_state === 'escalated' ? (
                <List.Item>
                  <List.Item.Meta avatar={<Avatar src={item.image} />} title={<a href="https://ant.design">{item.name}</a>} description={item.location} />
                  <div>
                    <div>
                      <Rate allowHalf defaultValue={item.rating} />
                    </div>
                    <div style={{ textAlign: 'right' }}>{[<IconText type="Base Price" text={item.basePrice} />]}</div>
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
              item.workFlow_state === 'active' ? (
                <List.Item
                  actions={[
                    <Button onClick={() => {}} type="primary">
                      Timer
                    </Button>
                  ]}
                >
                  <List.Item.Meta avatar={<Avatar src={item.image} />} title={<a href="https://ant.design">{item.name}</a>} description={item.location} />
                  <div>
                    <div>
                      <Rate allowHalf defaultValue={item.rating} />
                    </div>
                    <div style={{ textAlign: 'right' }}>{[<IconText type="Base Price" text={item.basePrice} />]}</div>
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
              item.workFlow_state === 'assigned' ? (
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
                    <div style={{ textAlign: 'right' }}>{[<IconText type="Base Price" text={item.basePrice} />]}</div>
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
