"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var is_mounted = false;

var CountdownTimer =
/*#__PURE__*/
function (_Component) {
  _inherits(CountdownTimer, _Component);

  _createClass(CountdownTimer, null, [{
    key: "propTypes",
    get: function get() {
      return {
        timeLeft: _propTypes.default.number
      };
    }
  }]);

  function CountdownTimer(props) {
    var _this;

    _classCallCheck(this, CountdownTimer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CountdownTimer).call(this, props));
    _this.state = {
      timeRemaining: this.props.timeLeft,
      interval:1000,
      prevTime:null
    };
    return _this;
  }

  _createClass(CountdownTimer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      is_mounted = true;
      this.startTimer();
      this.interval = setInterval(this.startTimer.bind(this), 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  },
  {
    key: "startTimer",
    value: function startTimer() {
      const currentTime = Date.now();
        const differenceInTime = this.getDifferenceInTime(currentTime);
        const interval = this.props.interval;
        const timeRemainingInInterval = this.getTimeRemainingInInterval(interval, differenceInTime);
        let timeout = timeRemainingInInterval;
        if (timeRemainingInInterval < (interval / 2.0)) {
            timeout += interval;
        }
        const timeRemaining = this.getTimeRemaining(differenceInTime);
        const countdownComplete = (this.state.prevTime && timeRemaining <= 0);
        if (is_mounted) {
           this.setCurrentState(countdownComplete, timeout, currentTime, timeRemaining);
        }
        if (countdownComplete && this.props.completeCallback) {
            this.props.completeCallback();
            this.componentWillUnmount();
        }
        if (this.props.tickCallback) {
            this.props.tickCallback(timeRemaining);
        }
    }
  },
  {
    key: "getDifferenceInTime",
    value: function getDifferenceInTime(currentTime) {
      return (this.state.prevTime ? (currentTime - this.state.prevTime) : 0);
    }
  },
  {
    key: "getTimeRemainingInInterval",
    value: function getTimeRemainingInInterval(interval, differenceInTime) {
      return (interval - (differenceInTime % interval));
    }
  },
  {
    key: "getTimeRemaining",
    value: function getTimeRemaining(differenceInTime) {
      return (Math.max(this.state.timeRemaining - differenceInTime, 0));
    }
  },
  {
    key: "setCurrentState",
    value: function setCurrentState(countdownComplete, timeout, currentTime, timeRemaining) {
      if(countdownComplete) {
        this.componentWillUnmount();
      }
      this.setState({
          prevTime: currentTime,
          timeRemaining: timeRemaining
      });
    }
  },
  {
    key: "getFormattedTime",
    value: function getFormattedTime(milliseconds) {
      const totalSeconds = Math.round(milliseconds / 1000);

        const seconds = parseInt((totalSeconds % 60).toString(), 10);
        const minutes = parseInt((totalSeconds / 60).toString(), 10) % 60;
        const hours = parseInt((totalSeconds / 3600).toString(), 10);

        const ss = seconds < 10 ? '0' + seconds : seconds;
        const mm = minutes < 10 ? '0' + minutes : minutes;
        const hh = hours < 10 ? '0' + hours : hours;

        return hh + ':' + mm + ':' + ss;
    }
  },{
    key: "render",
    value: function render() {
      var parentWrapper = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      };
      var childWrapper = {
        display: 'flex',
        justifyContent: 'center',
        width: '100px',
        alignItems: 'center',
        fontSize: 'larger',
        borderStyle: 'groove',
        padding: '1%'
      }
      return _react.default.createElement("div", {
        style: parentWrapper
      }, _react.default.createElement("div", {
        style: childWrapper
      }, " ", this.getFormattedTime(this.state.timeRemaining)));
    }
  }]);

  return CountdownTimer;
}(_react.Component);

exports.default = CountdownTimer;