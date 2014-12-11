/** @jsx React.DOM */

var Modal     = require('./modal');
var DateUtil  = require('./util/date');
var Calendar  = require('./calendar');
var DateInput = require('./date_input');

var DatePicker = React.createClass({

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
    if (this.state.modalVisible) {

      return (
        <Modal
          isModalVisible = {this.state.modalVisible}
          hideModal = {this.hideModal}
          currentInputDate={this.props.currentInputDate}
          saveDate={this.handleSaveDate}
          currentCalendarDate = {this.state.currentCalendarDate} >
          <Calendar
            currentInputDate={this.props.currentInputDate}
            currentCalendarDate = {this.state.currentCalendarDate}
            setCalendarDate={this.setCalendarDate} />
        </Modal>
      );
    }
  },

  render: function() {
    var formattedDateValue = (this.props.currentInputDate ? this.props.currentInputDate._date.format(this.props.dateFormat) : '');

    return (
      <div className='input-group'>
        <DateInput
          currentInputDate={this.props.currentInputDate}
          formattedDateValue = {formattedDateValue}
          dateFormat={this.props.dateFormat}
          setSelected={this.setSelected} />

          <span className='input-group-btn' onClick={this.showModal} >
              <button className='btn btn-default' type='button'>Go!</button>
          </span>

        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
