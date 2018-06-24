import React, { Component } from 'react';
import { Button, Modal } from 'antd';

class AssignedInfoModal extends Component {
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
          <div>
            Cost for Lead: <b>{this.props.data.actual_price}</b>
            <br />
            Distributer ID: <b>{this.props.data.id}</b>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AssignedInfoModal;
