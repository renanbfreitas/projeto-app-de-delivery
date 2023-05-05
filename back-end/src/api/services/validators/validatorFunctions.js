const { infoLoginSchema, infoRegisterSchema } = require('./schemas');

const validatorFieldsLogin = (infoLogin) => {
  const { error } = infoLoginSchema.validate(infoLogin);
  
  if (error) {
    return true;
  }

  return null;
};

const validatorFieldsRegister = (infoRegister) => {
  const { error } = infoRegisterSchema.validate(infoRegister);

  if (error) {
    return true;
  }
  
  return null;
};

module.exports = {
  validatorFieldsLogin,
  validatorFieldsRegister,
};
