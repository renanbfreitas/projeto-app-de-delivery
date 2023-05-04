const { infoLoginSchema } = require('./schemas');

const validatorFieldsLogin = (infoLogin) => {
  const { error } = infoLoginSchema.validate(infoLogin);
  
  if (error) {
    return true;
  }

  return null;
};

module.exports = {
  validatorFieldsLogin,
};
