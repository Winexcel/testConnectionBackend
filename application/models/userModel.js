// import base model
const BaseModel = require('@core.model');

class UserModel extends BaseModel {
  async auth(req, res, params, callback) {
    callback('success');
  }
}

const userModel = new UserModel();

module.exports = userModel;
