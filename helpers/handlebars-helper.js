const dayjs = require('dayjs')

module.exports = {
  date: time => dayjs(time).format('YYYY-MM-DD'),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}
