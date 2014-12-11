/** @jsx React.DOM */

var Day = React.createClass({
  render: function() {

    var classes = React.addons.classSet({
      'datepicker-calendar-day': true,
      'this-month': true,
      'selected': this.props.day.isSameDay(this.props.currentCalendarDate)
    });

    return (
      <div className={classes} onClick={this.props.onClickDay}>
        {this.props.day.day()}
      </div>
    );
  }
});

module.exports = Day;
