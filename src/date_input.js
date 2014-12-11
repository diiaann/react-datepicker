/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({

  displayName: 'DateInput',

  propTypes: {
    formattedDateValue: React.PropTypes.string
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
