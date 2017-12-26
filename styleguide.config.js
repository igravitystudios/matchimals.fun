const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, 'src/reset.css'),
    path.join(__dirname, 'src/app.css'),
  ],
};
