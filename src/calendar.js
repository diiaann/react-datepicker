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
      <div key={key} className="week">
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay: function(day, key) {
    if (day.isWeekend() || day.getHoliday()!==''){
      var desc = (day.isWeekend() ? 'Weekend' : day.getHoliday() );
      return (
        <Holiday
          key={key}
          day={day}
          desc={desc} />
      );
    }

    else {
      return (
        <Day
          key={key}
          day={day}
          onClickDay={this.handleDayClick.bind(this, day)}
          currentCalendarDate={this.props.currentCalendarDate} />
      );
    }
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      <div className="datepicker-calendar" onMouseDown={this.props.onMouseDown}>
        <div className="datepicker-calendar-header">
          <a className="datepicker-calendar-header-navigation-left"
              onClick={this.decreaseMonth}>
          </a>
          <span className="datepicker-calendar-header-month">
            {this.state.month.format("MMMM YYYY")}
          </span>
          <a className="datepicker-calendar-header-navigation-right"
              onClick={this.increaseMonth}>
          </a>
        </div>
        <div className="datepicker-calendar-month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
