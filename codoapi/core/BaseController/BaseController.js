// include response handler
const resHandler = require('@components/resHandler/resHandler');
// includes validators
const { validateParams } = require('@validator/validator');

class BaseController {
  constructor(model, validations) {
    this.model = model;
    this.validations = validations;
  }

  /* Trigger before validation */
  beforeValidation(req, res, method, params, response) {
  }

  /* Trigger after validation */
  async afterValidation(req, res, method, params, validateResult, response) {
    return true;
  }

  handle(req, res, method) {
    const response = resHandler.callback.bind(resHandler, req, res);
    const params = { ...req.body, ...req.query };
    const additionalParams = {};

    this.beforeValidation(req, res, method, params, response, additionalParams);
    const validateResult = validateParams({ ...params }, this.validations[method]);
    this.afterValidation(req, res, method, params, validateResult, response, additionalParams).then((next) => {
      if (next) {
        if (validateResult.isValid) {
          this.model.handle(req, res, method, { ...params },
            resHandler.callback.bind(resHandler, req, res), additionalParams);
        } else {
          resHandler.error(req, res, 100, validateResult.errorMessages);
        }
      }
    });

  }
}

module.exports = BaseController;
