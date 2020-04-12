class BaseRouter {
  constructor(app) {
    this.app = app;
  }

  addRoute(method, route, router) {
    this.app[method](route, router);
  }

  injectApp(app) {
    this.app = app;
  }
}

module.exports = BaseModel;
