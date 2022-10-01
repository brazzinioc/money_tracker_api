/* eslint-disable no-console */
class Logger {
  static log(args) {
    console.log(args);
  }

  static warn(args) {
    console.warn(args);
  }

  static error(args) {
    console.error(args);
  }

  static info(args) {
    console.info(args);
  }

  static debug(args) {
    console.debug(args);
  }
}

module.exports = Logger;
