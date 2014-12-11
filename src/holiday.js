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
      <div className='popover-wrapper'>
        <div className={dateClasses} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          {this.props.day.day()}
        </div>
        <div className={popoverClasses}>
          <div className="arrow"></div>
          <div className="popover-content">
            <p>{this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Holiday;
