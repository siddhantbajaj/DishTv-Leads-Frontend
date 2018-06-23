import React, { Component } from 'react';
import { Input, Tooltip, Button, Modal } from 'antd';

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };
  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange({ value: value.slice(0, -1) });
    }
    if (onBlur) {
      onBlur();
    }
  };
  render() {
    const { value } = this.props;
    const title = value ? <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span> : 'Input a number';
    return (
      <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
        <Input {...this.props} onChange={this.onChange} onBlur={this.onBlur} placeholder="Input a number" maxLength="25" />
      </Tooltip>
    );
  }
}

class ModalEdit extends Component {
  state = { visible: false, value: '' };
  componentDidMount() {
    this.setState({
      value: this.props.data.base_price
    });
  }
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
    this.props.updateBasePrice(this.state.value);
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
        <Button type={this.props.type} onClick={this.showModal}>
          {this.props.text}
        </Button>
        <Modal title={this.props.data.name} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>
            {this.props.text2} <NumericInput style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;
