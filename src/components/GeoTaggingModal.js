import React, { Component } from 'react';
import { Button, Modal, Radio } from 'antd';

const RadioGroup = Radio.Group;

class GeoTaggingModal extends Component {
  state = { visible: false, value: false };

  onChange = value => {
    this.setState({ value });
  };
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
    this.props.goLive(this.state.value);
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    return (
      <div>
        <Button type={this.props.type} onClick={this.showModal} style={{ ...this.props.style }}>
          {this.props.text}
        </Button>
        <Modal title={this.props.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          </div>
        </Modal>
      </div>
    );
  }
}

export default GeoTaggingModal;
