// include response handler
const resHandler = require('@components/resHandler/resHandler');

const bodyParser = require('body-parser');
// include all routers
const userRouter = require('@routers/userRouter');

module.exports = (app) => {
  // includes all subRouters
  try {
    app.all('/user.:method', userRouter);

    // for dev routers
    app.all('//user.:method', userRouter);


    // 404 handling
    app.all('*', (req, res) => {
      resHandler.error(req, res, 3);
    });
  } catch (error) {
    console.error(`${error.stack} | ts: ${new Date()}`);
  }
};
