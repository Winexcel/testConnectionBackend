//TODO: разработать шаблонизатор для вставки переменных в сообщения об ошибке
// пример:
//   100500: {
//     error_msg: 'This thing went wrong: $thing',
//   },
// при вызове
// resHandler.error(req, res, 100500, {thing: 'token is expired'});

// TODO: вынести объявление кодов ошибок из core в application

const errors = {
  0: {
    error_msg: 'Unknown error occurred',
  },

  3: {
    error_msg: 'Unknown method passed',
  },

  6: {
    error_msg: 'Too many requests per second',
  },

  100: {
    error_msg: 'One of the parameters specified was missing or invalid:',
  },

  113: {
    error_msg: 'Invalid user id',
  },

  114: {
    error_msg: 'Incorrect sign signature',
  },

  115: {
    error_msg: 'FATAL error invalid query',
  },

  116: {
    error_msg: 'Invalid access_token',
  },

  117: {
    error_msg: 'No matching people found',
  },

  118: {
    error_msg: 'Invalid login or password',
  },

  119: {
    error_msg: 'Invalid url',
  },

  120: {
    error_msg: 'Specified user don\'t have enough own_likes',
  },

  121: {
    error_msg: 'Invalid vote_identificator',
  },

  122: {
    error_msg: 'this likes packet not found',
  },

  123: {
    error_msg: 'Profile is private',
  },

  124: {
    error_msg: 'Access denied',
  },

  125: {

  }
};

module.exports = errors;
