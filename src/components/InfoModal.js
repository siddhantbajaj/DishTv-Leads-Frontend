import React, { Component } from 'react';
import { Button, Modal } from 'antd';

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
          <div>
            Mobile Number: <b>{this.props.data.number}</b>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;
