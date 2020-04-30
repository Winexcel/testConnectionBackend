// import base model
const BaseModel = require('@core.model');

//import overall modules
const cryptoJS = require('crypto-js');

// import configs
const userConfig = require('@config/config').userConfig;
const testConfig = require('@config/config').testConfig;

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

class UserModel extends BaseModel {
  async auth(req, res, params, callback) {
    if (userConfig.login === params.login && userConfig.password === params.password) {
      let accessToken = 'eltex';//cryptoJS.SHA256(params.login + Date.now().toString()).toString();
      userConfig.accessToken = accessToken;

      callback({ accessToken });
    } else {
      callback({ errorCode: 118 });
    }
  }

  startTest(req, res, params, callback) {
    testConfig.maxValue = parseInt(params.value);
    testConfig.currentValue = parseInt(params.value);
    testConfig.result = 0;
    testConfig.isCompleted = false;

    debugger;
    callback(testConfig);
  }

  tick(req, res, params, callback,) {
    if (testConfig.currentValue > 0) {
      testConfig.currentValue = testConfig.currentValue - 1;
    }

    if (!testConfig.isCompleted && testConfig.currentValue === 0) {
      let randomInt = 0;
      do {
        randomInt = randomInteger(1002, 1010);
      } while (randomInt === 1007 || randomInt === 1009);

      testConfig.result = randomInt;
      testConfig.isCompleted = true;
    }

    callback(testConfig);
  }

  getTest(req, res, params, callback) {
    callback(testConfig);
  }

  finishTest(req, res, params, callback) {
    testConfig.maxValue = 0;
    testConfig.currentValue = 0;
    testConfig.result = 0;
    testConfig.isCompleted = true;

    callback(testConfig);
  }
}

const userModel = new UserModel();

module.exports = userModel;
