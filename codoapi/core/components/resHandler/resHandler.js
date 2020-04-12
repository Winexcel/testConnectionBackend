'use strict';

const errorsHandler = require('@components/errorsHandler/errorsHandler');
const responseHandler = require('@components/responseHandler/responseHandler');

const resHandler = {
  res(req, res, data) {
    res.end(JSON.stringify(responseHandler.handle(data)));
  },

  //TODO: добавить вывод request params
  error(req, res, errorCode, errorMessage = null) {
    let data = { errorCode };
    if (errorMessage !== null && errorMessage !== undefined) {
      data.errorMessage = errorMessage;
    }
    res.end(JSON.stringify(errorsHandler.handle(data)));
  },

  callback(req, res, data) {
    if ((typeof data === 'object') && ('errorCode' in data)) {
      this.error(req, res, data.errorCode, data.errorMessage);
    } else {
      this.res(req, res, data);
    }
  }
};

module.exports = resHandler;
