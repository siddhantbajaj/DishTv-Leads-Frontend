// inspired from https://github.com/sungwoncho/react-cntdwn/blob/master/src/cntdwn.jsx

import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';

const COUNTDOWN_NOT_STARTED = 1;
const COUNTDOWN_STARTED = 2;
const COUNTDOWN_FINISHED = 3;

export default class Countdown extends Component {
  state = {
    years: dayjs(this.props.targetDate).diff(dayjs(), 'years'),
    months: dayjs(this.props.targetDate).diff(dayjs(), 'months'),
    days: dayjs(this.props.targetDate).diff(dayjs(), 'days'),
    hours: dayjs(this.props.targetDate).diff(dayjs(), 'hours'),
    minutes: dayjs(this.props.targetDate).diff(dayjs(), 'minutes'),
    seconds: dayjs(this.props.targetDate).diff(dayjs(), 'seconds'),
    status: COUNTDOWN_NOT_STARTED,
    intervalId: null
  };

  componentWillMount() {
    setTimeout(() => {
      let timer = setInterval(() => {
        this.tick();
      }, this.props.interval);

      this.setState({
        status: COUNTDOWN_STARTED,
        intervalId: timer
      });

      this.tick();
    }, this.props.startDelay);
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  calculateRemainingTime = () => {
    return -1 * dayjs(this.props.targetDate).diff(dayjs());
  };

  tick = () => {
    this.setState({
      years: dayjs(this.props.targetDate).diff(dayjs(), 'years'),
      months: dayjs(this.props.targetDate).diff(dayjs(), 'months'),
      days: dayjs(this.props.targetDate).diff(dayjs(), 'days'),
      hours: dayjs(this.props.targetDate).diff(dayjs(), 'hours'),
      minutes: dayjs(this.props.targetDate).diff(dayjs(), 'minutes'),
      seconds: dayjs(this.props.targetDate).diff(dayjs(), 'seconds')
    });

    if (this.state.seconds <= 0) {
      this.setState({
        status: COUNTDOWN_FINISHED
      });

      if (this.props.onFinished) {
        this.props.onFinished();
      }
      clearInterval(this.state.intervalId);
    }
  };

  renderRemainingTime = () => {
    let timeleft;
    let { years, months, days, hours, minutes, seconds } = this.state;

    if (years > 0) {
      timeleft = (
        <Fragment key="day">
          <b>{years}</b> <span>years to go</span>
        </Fragment>
      );
    } else if (months > 0) {
      timeleft = (
        <Fragment key="day">
          <b>{months}</b> <span>months to go</span>
        </Fragment>
      );
    } else if (days > 0) {
      timeleft = (
        <Fragment key="day">
          <b>{days}</b> <span>days to go</span>
        </Fragment>
      );
    } else if (hours > 0) {
      timeleft = (
        <Fragment key="hours">
          <b>{hours}</b> <span>hours to go</span>
        </Fragment>
      );
    } else if (minutes > 0) {
      timeleft = (
        <Fragment key="minutes">
          <b>{minutes}</b> <span>minutes to go</span>
        </Fragment>
      );
    } else if (seconds > 0) {
      timeleft = (
        <Fragment key="seconds">
          <b>{seconds}</b> <span>seconds to go</span>
        </Fragment>
      );
    }

    return timeleft;
  };

  render() {
    if (this.state.status === COUNTDOWN_FINISHED) {
      this.props.callback();
      return (
        <div className="leftTime">
          <b>Times up</b>
        </div>
      );
    }
    return <div className="leftTime">{this.renderRemainingTime()}</div>;
  }
}
