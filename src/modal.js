/** @jsx React.DOM */

var Modal = React.createClass({
  displayName: 'Modal',

  propTypes: {
    currentInputDate: React.PropTypes.object.isRequired,
    currentCalendarDate: React.PropTypes.object.isRequired,
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
      <div className={modalClasses}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="datepicker-calendar-popover-content">
                {this.props.children}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.hideModal}>Close</button>
              <button type="button" className="btn btn-primary" disabled={saveButtonDisabled} onClick={this._handleSaveDate}>Save</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = Modal;
