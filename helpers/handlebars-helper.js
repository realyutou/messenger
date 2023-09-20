const dayjs = require('dayjs')

module.exports = {
  date: time => dayjs(time).format('YYYY-MM-DD')
}
