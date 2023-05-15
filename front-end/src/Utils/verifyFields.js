const verifyFields = (name, email, password) => {
  const minNameLength = 12;
  const minPasswordLength = 6;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const checkEmail = regexEmail.test(email);

  const checkPassword = password.length >= minPasswordLength;

  const checkName = name ? name.length >= minNameLength : true;

  return (checkEmail && checkPassword && checkName);
};

export default verifyFields;
