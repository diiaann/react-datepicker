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
