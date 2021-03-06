module.exports = {
  process: (src) => {
    return `
      const handlebars = require('handlebars')
      module.exports = handlebars.compile(\`${src}\`)
    `
  }
}
