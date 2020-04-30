// includes all models
const userModel = require('@models/userModel');
// includes validations rules
const { userValidations } = require('@validations/userValidations');
// import base controller
const BaseController = require('@core.controller');
// import configs
const userConfig = require('@config/config').userConfig;

class UserController extends BaseController {

  constructor(model, validations) {
    super(model, validations);

    console.log('UserController created.');
  }

  checkToken(accessToken) {
    if (userConfig.accessToken === accessToken) {
      return true;
    }

    return false;
  }

  async afterValidation(req, res, method, params, validateResult, response, additionalParams) {
    /* Check access_token if it's required */
    if (params.accessToken) {
      if (this.checkToken(params.accessToken)) {
        additionalParams['user'] = { 'name': 'WinniPoh' };
        return true;
      }

      response({
        errorCode: 100,
        errorMessage: ['accessToken'],
      });
      return false;
    }

    return true;
  }


  handle(req, res, method) {
    super.handle(req, res, method);
  }
}

const userController = new UserController(userModel, userValidations);

module.exports = userController;
