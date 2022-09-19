import { isNotEmpty } from './generic-validator';

const validEmailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const isEmail = (emailAddress) => validEmailRegex.test(emailAddress);

const isValidEmail = (value) => {
  // Can add more validate functions here in the future
  if (!isNotEmpty(value)) return [isNotEmpty(value), 'Email cannot be empty!'];

  if (!isEmail(value)) return [isEmail(value), 'Invalid email address!'];

  return [true, ""];
};

export default isValidEmail;