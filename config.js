const path = require('path');

module.exports.config = {
  host: 'localhost',
  port: 3030,
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'static'),
    },
  },
};
