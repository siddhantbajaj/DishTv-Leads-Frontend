import React, { Component } from 'react';
import { Form, InputNumber, Button } from 'antd';

const FormItem = Form.Item;

class Modal extends Component {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type={this.props.type} onClick={this.showModal}>
          {this.props.text}
        </Button>
        <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>{this.props.data.name}</div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="Base Price">
              <span className="ant-form-text">₹ </span>
              {getFieldDecorator('input-number', { initialValue: this.props.data.basePrice })(<InputNumber min={1} max={2000} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedModal = Form.create()(Modal);

export default WrappedModal;
