const userValidations = {
  auth: {
    login: {
      required: true,
      string: true,
    },
    password: {
      required: true,
      string: true,
    },
  },
  startTest: {
    accessToken: {
      required: true,
      string: true,
    },
    value: {
      required: true,
      integer: true,
    }
  },
  getTest: {
    accessToken: {
      required: true,
      string: true,
    },
  }
};

module.exports = {
  userValidations,
};
