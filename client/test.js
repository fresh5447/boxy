var React = require('react');
var ReactDOM = require('react-dom');
var TextField = require('material-ui/lib/text-field');

var ColorPicker = require('./colorPicker');
var OneClock = require('./oneClock');
var JammerClock = require('./jammerClock');

var Bout = React.createClass({
  getInitialState: function() {
    return {
      color: '#FF0000',
      color2: '#00FF00',
      pause: false,
      clocks: [300000, 300000, 300000, 300000, 300000, 300000],
      clockOne: 300000,
      clockTwo: 300000,
      clockThree: 300000,
      clockFour: 300000,
      clockFive: 300000,
      clockSix: 300000,
      clockOneStarted: false
    };
  },
  handleClockClick: function(whichClock){
    var newState = {clocks:[]};
    newState.clocks[whichClock] = !this.state.clocks[whichClock];
    this.setState(newState);
  },
  handleResetClick: function(whichClock){
    var newState = {clocks:[]};
    newState.clocks[whichClock] = 300000;
    this.setState(newState);
  },
  clockTickCallback: function(whichClock){
    if(!this.state.pause){
      var newState = {clocks:[]};
      newState.clocks[whichClock] = this.state.clocks[whichClock] - 10000;
      this.setState(newState);
    }

  },
  getPauseInfo: function() {
    if (this.state.pause) {
      return 'JAM STOP';
    } else {
      return 'JAM START';
    }
  }, 
  handlePauseAll: function() {
    this.setState({pause: !this.state.pause});
  },
  changeColor: function(color) {
    this.setState({color: color});
  },
  changeColorText: function(evt) {
    this.changeColor(evt.target.value);
  },
  changeColor2: function(color2) {
    this.setState({color2: color2});
  },
  changeColorText2: function(evt) {
    this.changeColor2(evt.target.value);
  },
  switchJammers: function(){
    var newOne, newFour;
    newOne = this.state.clockFour; 
    newFour = this.state.clockOne;
    this.setState({
      clockOne: newOne,
      clockFour: newFour
    });

  },
  render: function() {
    var pause = this.state.pause;
    return (
        <div>

          <div className="col-xs-6 col-sm-4 col-sm-offset-2 ">
            <h3> Home Team </h3>
            <button onClick={this.switchJammers}> switch jamemrs </button>
            <div className="form-area">
              <TextField hintText="Enter Color" floatingLabelText="Home Color:" style={{width: '95%'}} onChange={this.changeColorText} />
            </div>
            <div className="clock-button" style={{backgroundColor: this.state.color}}>
                <OneClock handleReset={this.handleResetClick.bind(this, 0)} handleClick={this.handleClockClick.bind(this, 0)} started={this.state.clockOneStarted} maxTicks={30000} ticks={this.state.clocks[0]} callbackInterval={1000} tickCallback={this.clockTickCallback.bind(this, 0)} />
            </div>
            <div className="clock-button" style={{backgroundColor: this.state.color}}>
                <OneClock handleReset={this.handleResetClick.bind(this, 1)} handleClick={this.handleClockClick.bind(this, 1)} started={this.state.clockTwoStarted} maxTicks={30000} ticks={this.state.clocks[1]} callbackInterval={1000} tickCallback={this.clockTickCallback.bind(this, 1)} />
            </div>
            <div className="clock-button" style={{backgroundColor: this.state.color}}>
                <OneClock handleReset={this.handleResetClick.bind(this, 'clockThree')} handleClick={this.handleClockClick.bind(this, 'clockThree')} started={this.state.clockThreeStarted} maxTicks={30000} ticks={this.state.clockThree} callbackInterval={1000} tickCallback={this.clockTickCallback.bind(this, 'clockThree')} />
            </div>
            </div>
            <div className="col-xs-6 col-sm-4">
             <h3> Visitors </h3>
              <div className="form-area">
                <TextField hintText="Enter Color" floatingLabelText="Visitor Color:" style={{width: '95%'}} onChange={this.changeColorText2} />
              </div>
              <div className="clock-button" style={{backgroundColor: this.state.color2}}>
                <OneClock handleReset={this.handleResetClick.bind(this, 'clockFour')} handleClick={this.handleClockClick.bind(this, 'clockFour')} started={this.state.clockFourStarted} maxTicks={30000} ticks={this.state.clockFour} callbackInterval={1000} tickCallback={this.clockTickCallback.bind(this, 'clockFour')} />
              </div>
              <div className="clock-button" style={{backgroundColor: this.state.color2}}>
                <OneClock handleReset={this.handleResetClick.bind(this, 'clockFive')} handleClick={this.handleClockClick.bind(this, 'clockFive')} started={this.state.clockFiveStarted} maxTicks={30000} ticks={this.state.clockFive} callbackInterval={1000} tickCallback={this.clockTickCallback.bind(this, 'clockFive')} />
              </div>
            <div className="clock-button" style={{backgroundColor: this.state.color2}}>
                <OneClock handleReset={this.handleResetClick.bind(this, 'clockSix')} handleClick={this.handleClockClick.bind(this, 'clockSix')} started={this.state.clockSixStarted} maxTicks={30000} ticks={this.state.clockSix} callbackInterval={1000} tickCallback={this.clockTickCallback.bind(this, 'clockSix')} />
            </div>
            </div>
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 center">
              <button className="reset-all" onClick={this.handlePauseAll}>{this.getPauseInfo()}</button>
              <ColorPicker value={this.state.color} onChange={this.changeColor} />
              <ColorPicker value={this.state.color2} onChange={this.changeColor2} />
            </div>
          </div>
        );
  },

});

ReactDOM.render(<Bout/>, document.getElementById('timers'));

// react update state utility
