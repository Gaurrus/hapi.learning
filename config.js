const path = require('path');

module.exports = {
  server: {
    host: 'localhost',
    port: 3030,
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'src/static'),
      },
    },
  },
};
