!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DatePicker=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var Day = require('./day');
var Holiday = require('./holiday');
var DateUtil = require('./util/date');

var Calendar = React.createClass({

  displayName: 'Calendar',

  propTypes: {
    currentInputDate: React.PropTypes.object,
    currentCalendarDate: React.PropTypes.object,
    setCalendarDate: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      month: new DateUtil(moment())
    };
  },

  increaseMonth: function() {
    this.setState({
      month: this.state.month.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      month: this.state.month.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.month.mapWeeksInMonth(this.renderWeek);
  },

  handleDayClick: function(day) {
    this.setState({
      month: day
    });
    this.props.setCalendarDate(day);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.month)) {
      return;
    }

    return (
      React.DOM.div({key: key, className: "week"}, 
        this.days(weekStart)
      )
    );
  },

  renderDay: function(day, key) {
    if (day.isWeekend() || day.getHoliday()!==''){
      var desc = (day.isWeekend() ? 'Weekend' : day.getHoliday() );
      return (
        Holiday({
          key: key, 
          day: day, 
          desc: desc})
      );
    }

    else {
      return (
        Day({
          key: key, 
          day: day, 
          onClickDay: this.handleDayClick.bind(this, day), 
          currentCalendarDate: this.props.currentCalendarDate})
      );
    }
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      React.DOM.div({className: "datepicker-calendar", onMouseDown: this.props.onMouseDown}, 
        React.DOM.div({className: "datepicker-calendar-header"}, 
          React.DOM.a({className: "datepicker-calendar-header-navigation-left", 
              onClick: this.decreaseMonth}
          ), 
          React.DOM.span({className: "datepicker-calendar-header-month"}, 
            this.state.month.format("MMMM YYYY")
          ), 
          React.DOM.a({className: "datepicker-calendar-header-navigation-right", 
              onClick: this.increaseMonth}
          )
        ), 
        React.DOM.div({className: "datepicker-calendar-month"}, 
          this.weeks()
        )
      )
    );
  }
});

module.exports = Calendar;

},{"./day":4,"./holiday":5,"./util/date":7}],2:[function(require,module,exports){
/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({

  displayName: 'DateInput',

  propTypes: {
    formattedDateValue: React.PropTypes.string
  },

  render: function() {
    return (
        React.DOM.input({
        disabled: "disabled", 
        ref: "input", 
        type: "text", 
        value: this.props.formattedDateValue, 
        className: "datepicker-input form-control"})

    );
  }
});

module.exports = DateInput;

},{"./util/date":7}],3:[function(require,module,exports){
/** @jsx React.DOM */

var Modal     = require('./modal');
var DateUtil  = require('./util/date');
var Calendar  = require('./calendar');
var DateInput = require('./date_input');

var DatePicker = React.createClass({

  displayName: 'DatePicker',

  propTypes: {
    currentInputDate: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
    saveDate: React.PropTypes.func
  },

  // when a user is selecting a new date, they are not the same
  getInitialState: function() {
    return {
      isModalVisible: false,
      currentCalendarDate: this.props.currentInputDate
    };
  },

  setCalendarDate: function(date) {
    this.setState({
      currentCalendarDate: date
    });
  },

  handleSaveDate: function(date){
    this.props.saveDate(this.state.currentCalendarDate);
  },

  showModal: function(){
    this.setState({
      modalVisible: true
    });
  },

  hideModal: function(){
    this.setState({
      modalVisible: false
    });
  },

  calendar: function() {
    return (
      Modal({
        isModalVisible: this.state.modalVisible, 
        hideModal: this.hideModal, 
        currentInputDate: this.props.currentInputDate, 
        saveDate: this.handleSaveDate, 
        currentCalendarDate: this.state.currentCalendarDate}, 
        Calendar({
          currentInputDate: this.props.currentInputDate, 
          currentCalendarDate: this.state.currentCalendarDate, 
          setCalendarDate: this.setCalendarDate})
      )
    );
  },

  render: function() {
    var formattedDateValue = (this.props.currentInputDate ? this.props.currentInputDate._date.format(this.props.dateFormat) : '');

    return (
      React.DOM.div({className: "input-group"}, 
        DateInput({formattedDateValue: formattedDateValue}), 
          React.DOM.span({className: "input-group-btn", onClick: this.showModal}, 
              React.DOM.button({className: "btn btn-default", type: "button"}, "Go!")
          ), 
        this.calendar()
      )
    );
  }
});

module.exports = DatePicker;

},{"./calendar":1,"./date_input":2,"./modal":6,"./util/date":7}],4:[function(require,module,exports){
/** @jsx React.DOM */

var Day = React.createClass({

  displayName: 'Day',

  render: function() {

    var classes = React.addons.classSet({
      'datepicker-calendar-day': true,
      'this-month': true,
      'selected': this.props.day.isSameDay(this.props.currentCalendarDate)
    });

    return (
      React.DOM.div({className: classes, onClick: this.props.onClickDay}, 
        this.props.day.day()
      )
    );
  }
});

module.exports = Day;

},{}],5:[function(require,module,exports){
/** @jsx React.DOM */

var Holiday = React.createClass({

  displayName: 'Holiday',

  getInitialState: function() {
    return {
      showPopover: false
    };
  },

  handleMouseOver: function(){
    console.log('mouseover');
    this.setState({
      showPopover: true
    });
  },

  handleMouseOut: function(){
    console.log('mouseout');
    this.setState({
      showPopover: false
    });
  },

  render: function() {

    var dateClasses = React.addons.classSet({
      'datepicker-calendar-day': true,
      'this-month': true,
      'holiday': true

    });

    var popoverClasses = React.addons.classSet({
      'popover': true,
      'bottom': true,
      'display': this.state.showPopover

    });

    return (
      React.DOM.div({className: "popover-wrapper"}, 
        React.DOM.div({className: dateClasses, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut}, 
          this.props.day.day()
        ), 
        React.DOM.div({className: popoverClasses}, 
          React.DOM.div({className: "arrow"}), 
          React.DOM.div({className: "popover-content"}, 
            React.DOM.p(null, this.props.desc)
          )
        )
      )
    );
  }
});

module.exports = Holiday;

},{}],6:[function(require,module,exports){
/** @jsx React.DOM */

var Modal = React.createClass({

  displayName: 'Modal',

  propTypes: {
    currentInputDate: React.PropTypes.object,
    currentCalendarDate: React.PropTypes.object,
    saveDate: React.PropTypes.func
  },

  _handleSaveDate: function(){
    this.props.saveDate();
    this.props.hideModal();
  },

  render: function() {

    var saveButtonDisabled;
    if (this.props.currentCalendarDate == null){
      saveButtonDisabled = true;
    }
    else if (this.props.currentCalendarDate.isSameDay(this.props.currentInputDate)){
      saveButtonDisabled = true;
    }
    else{
      saveButtonDisabled = false;
    }

    var modalClasses = React.addons.classSet({
      'modal': true,
      'fade': true,
      'visible': this.props.isModalVisible
    });

    return (
      React.DOM.div({className: modalClasses}, 
        React.DOM.div({className: "modal-dialog"}, 
          React.DOM.div({className: "modal-content"}, 
            React.DOM.div({className: "modal-body"}, 
              React.DOM.div({className: "datepicker-calendar-popover-content"}, 
                this.props.children
              )
            ), 
            React.DOM.div({className: "modal-footer"}, 
              React.DOM.button({type: "button", className: "btn btn-default", onClick: this.props.hideModal}, "Close"), 
              React.DOM.button({type: "button", className: "btn btn-primary", disabled: saveButtonDisabled, onClick: this._handleSaveDate}, "Save")
            )
          )
        )
      )

    );
  }
});

module.exports = Modal;

},{}],7:[function(require,module,exports){
var holidays = require('./holiday');

function DateUtil(date) {
  this._date = date;
}

DateUtil.prototype.getHoliday = function() {
  var self = this;
  var desc = '';

  holidays.forEach( function (holiday){
    if (self._date.isSame(holiday.date, 'date')){
      desc = holiday.desc;
    }
  });

  return desc;
};

DateUtil.prototype.isWeekend = function() {
  var dayOfWeek = this._date.day();

  if (dayOfWeek === 0 || dayOfWeek === 6)
    return true;
  else
    return false;
};

DateUtil.prototype.isSameDay = function(otherDay) {
  if (otherDay == null) return false;
  return this._date.isSame(otherDay._date, 'day');
};

DateUtil.prototype.sameMonth = function(other) {
  return this._date.isSame(other._date, 'month');
};

DateUtil.prototype.day = function() {
  return this._date.date();
};

DateUtil.prototype.mapDaysInWeek = function(callback) {
  var week = [];
  var firstDay = this._date.clone().startOf('week');

  for(var i = 0; i < 7; i++) {
    var day = new DateUtil(firstDay.clone().add('days', i));

    week[i] = callback(day, i);
  }

  return week;
};

DateUtil.prototype.mapWeeksInMonth = function(callback) {
  var month = [];
  var firstDay = this._date.clone().startOf('month').startOf('week');

  for(var i = 0; i < 6; i++) {
    var weekStart = new DateUtil(firstDay.clone().add('weeks', i));

    month[i] = callback(weekStart, i);
  }

  return month;
};

DateUtil.prototype.weekInMonth = function(other) {
  var firstDayInWeek = this._date.clone();
  var lastDayInWeek = this._date.clone().weekday(6);

  return firstDayInWeek.isSame(other._date, 'month') ||
    lastDayInWeek.isSame(other._date, 'month');
};

DateUtil.prototype.format = function() {
  return this._date.format.apply(this._date, arguments);
};

DateUtil.prototype.addMonth = function() {
  return new DateUtil(this._date.clone().add('month', 1));
};

DateUtil.prototype.subtractMonth = function() {
  return new DateUtil(this._date.clone().subtract('month', 1));
};

DateUtil.prototype.clone = function() {
  return new DateUtil(this._date.clone());
};

DateUtil.prototype.moment = function() {
  return this._date;
};

module.exports = DateUtil;

},{"./holiday":8}],8:[function(require,module,exports){
var holidays = [
  { "date" : "2014-01-01", "desc" : "New Year's Day" },
  { "date" : "2014-07-04", "desc" : "Independence Day" },
  { "date" : "2014-11-11", "desc" : "Veteran's Day" },
  { "date" : "2014-11-28", "desc" : "Thanksgiving Day" },
  { "date" : "2014-11-29", "desc" : "Day after Thanksgiving" },
  { "date" : "2014-12-24", "desc" : "Christmas Eve" },
  { "date" : "2014-12-25", "desc" : "Christmas Day" },
  { "date" : "2014-12-31", "desc" : "New Year's Eve" }
];

module.exports = holidays;

},{}]},{},[3])(3)
});