var React = require('react');
var ReactDOM = require('react-dom');
var RaisedButton = require('material-ui').RaisedButton;
var FloatingActionButton = require('material-ui').FloatingActionButton;
var Colors = require('material-ui/lib/styles/colors');

var Clock = require('./clockText');

var OneClock = React.createClass({
  propTypes: {
    pause: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      isPlaying: false,
      time: 30 * 10000,
      maxtime: 30 * 10000,
    };
  },
  initTimerInterval: function(props){
    if(props.started && !this.timerInterval){
      this.timerInterval = setInterval(props.tickCallback, props.interval || 1000);
    } else if (!props.started && this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },
  componentDidMount: function() {
    this.initTimerInterval(this.props)
  },
  componentWillReceiveProps: function(newProps) {
    if (this.state.time !== 300000) {
      if (this.props.pause === this.state.isPlaying) {
        this.handleStart();
      }
    };
    this.initTimerInterval(newProps)
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.isPlaying) {
      if (!this.timer) {
        this.timer = this.startTimer();
      }
    } else {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  },
  componentWillUnmount: function() {
    window.clearInterval(this.timerInterval);
    this.timer = null;
  },
  getIconName: function() {
    if (this.state.isPlaying) {
      return 'fa fa-5x fa-pause';
    } else {
      return 'fa fa-5x fa-play';
    }
  },
  startTimer: function() {
    var that = this;
    return window.setInterval(function() {
      if (that.state.time > 0) {
        that.setState({
          time: that.state.time - 1000
        });
      } else {
        that.timeOver();
      }
    }, 100);
  },
  handleStart: function() {
    var that = this;
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  },
  handleReset: function() {
    this.setState({
      time: this.state.maxtime,
      isPlaying: false
    });
  },

  timeOver: function() {
    this.setState({
      time: this.state.maxtime,
      isPlaying: false
    });
  },
  render: function() {
    console.log('ticks prop', this.props.ticks);
    return (
      <div>
        <button className="clock-float" onClick={this.props.handleClick} ><Clock time={this.props.ticks} /></button>
        <button className="clock-float" onClick={this.props.handleClick}><i className={this.getIconName()}></i></button>
        <button className="reset" onClick={this.props.handleReset}> Reset </button>
      </div>
      );
  }
});

module.exports = OneClock;
