const path = require('path')

module.exports = {
  isDev(context) {
    return context.command === 'develop' && true
  },
  computePath(string) {
    return path.resolve(__dirname, string)
  }
}
