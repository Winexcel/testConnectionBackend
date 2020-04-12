// include response handler
const resHandler = require('@components/resHandler/resHandler');
// includes all controllers
const userController = require('@controllers/userController');

const userRouter = (req, res) => {
  switch (req.params.method) {
    case 'auth': {
      userController.handle(req, res, req.params.method);
      break;
    }
    default:
      resHandler.error(req, res, 3);
  }
};

module.exports = userRouter;
