const userValidations = {
  auth: {
    access_token: {
      required: true,
      string: true,
    },
  },
};

module.exports = {
  userValidations,
};
