'use strict';

const errors = require('@components/errorsHandler/errors');

const errorsHandler = {
  handle(data) {
    if (data.errorCode in errors) {
      let error = {
        'error': {
          'error_code': data.errorCode,
          ...errors[data.errorCode],
        }
      };

      if ('errorMessage' in data) {
        error.error.error_msg += data.errorMessage;
      }
      return error;
    } else {
      let error = {
        'error': {
          'error_code': 0,
          ...errors[0],
        }
      };

      return error;
    }
  }
};

module.exports = errorsHandler;
