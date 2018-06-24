import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import call from '../images/call.png';

class ModalEdit extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <Button type={this.props.type} onClick={this.showModal} type="primary">
          {this.props.text}
        </Button>
        <Modal title={this.props.data.name} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div style={{ display: 'flex' }}>
            <span>
              Mobile Number: <b>{this.props.data.number}</b>
            </span>
            <img
              src={call}
              style={{
                width: '44px',
                height: '44px',
                marginTop: '-11px',
                marginLeft: '45%',
                cursor: 'pointer'
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;
