const dayjs = require('dayjs')

const messageHelper = (host, text) => {
  return {
    host,
    text,
    time: dayjs().format('YYYY-MM-DD HH:mm')
  }
}

module.exports = messageHelper
