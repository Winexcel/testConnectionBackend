// includes all models
const userModel = require('@models/userModel');
// includes validations rules
const { userValidations } = require('@validations/userValidations');
// import base controller
const BaseController = require('@core.controller');

class UserController extends BaseController {

  constructor(model, validations) {
    super(model, validations);

    console.log('UserController created.');
  }

  checkToken(token) {
    if (token === 'ABCD') {
      return true;
    }

    return false;
  }

  async afterValidation(req, res, method, params, validateResult, response) {
    if (params.access_token) {
      /* Check access_token if it's required */
      if (this.checkToken(params.access_token)) {
        return true;
      }

      response({
        errorCode: 100,
        errorMessage: ['access_token'],
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
