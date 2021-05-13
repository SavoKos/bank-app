export const validation = info => {
  const errorMessage = [];

  const emailValidateRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (info.password && info.password.length < 7)
    errorMessage.push('Password must be at least 7 characters long!');

  if (!emailValidateRegex.test(String(info.email).toLowerCase()))
    errorMessage.push('Enter Valid Email!');

  return errorMessage;
};
