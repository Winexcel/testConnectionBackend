class BaseModel {
  async handle(req, res, method, params, callback, additionalParams) {
    try {
      if (this[method].constructor.name === 'AsyncFunction') {
        await this[method](req, res, params, callback, additionalParams);
      } else {
        this[method](req, res, params, callback, additionalParams);
      }
    } catch (error) {
      callback(req, res, { errorCode: 0 });
      console.error(`${error.stack} | ts: ${new Date()}`);
    }
  }
}

module.exports = BaseModel;
