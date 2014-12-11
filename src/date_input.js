/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {

    if (this.props.currentInputDate != null)
     return {
        value: this.props.currentInputDate.format(this.props.dateFormat)
      };
    else
      return {
        value: ''
      };
  },

  componentDidMount: function() {
  },

  componentWillReceiveProps: function(newProps) {
  },

  handleClick: function(event) {
    this.props.handleClick(event);
  },

  render: function() {
    return (
        <input
        disabled = 'disabled'
        ref="input"
        type="text"
        value={this.props.formattedDateValue}
        className="datepicker-input form-control" />

    );
  }
});

module.exports = DateInput;
