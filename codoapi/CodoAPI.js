/**
 * Codoapi entry point
 */

require('module-alias/register');
const process = require('process');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const errorsHandler = require('@components/errorsHandler/errorsHandler');

class CodoAPI {
  constructor() {
    this.app = app;
  }


  addAppRouter(appRouter) {
    appRouter(this.app);
  }

  /**
   * Initialize server
   */
  init() {
    this.app.listen(3000);
  }

  /**
   * Close server
   */
  close() {

  }

  defaultSettingsForAppRouter() {
    try {
      app.use(bodyParser.json()); // support json encoded bodies
      app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
      // handling some errors
      app.use((error, req, res, next) => {
        // Catch bodyParser error and some others errors

        // если это ошибка при отправке кривых данных, которые боди парсер не в состоянии спарсить,
        // то просто игнориуем её
        if (~error.stack.indexOf('body-parser')) {
          next();
        } else {
          console.error(`${error.stack} | ts: ${new Date()}`);
        }
      });

      app.use((req, res, next) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, PARAM_HEADER');

        next();
      });

      app.set('trust proxy', 1);

      const apiLimiter = rateLimit({
        windowMs: 1000, // 1 seconds
        max: 10000,
        message: JSON.stringify(errorsHandler.handle({ errorCode: 6 })),
      });

      // routers all path to correct subRouters
      // for production routers

      app.use('/', apiLimiter);
    } catch (error) {
      console.error(`${error.stack} | ts: ${new Date()}`);
    }
  }
}

const codoAPI = new CodoAPI();

module.exports = codoAPI;
