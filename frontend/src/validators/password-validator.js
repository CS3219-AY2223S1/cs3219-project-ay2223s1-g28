import { isNotEmpty, hasMinLength } from './generic-validator';

const PASSWORD_MIN_LENGTH = 8;

const isValidPassword = (value) => {
  // Can add more validate functions here in the future
  if (!isNotEmpty(value)) return [isNotEmpty(value), 'Password cannot be empty!'];

  const isValidPasswordLength = hasMinLength(value, PASSWORD_MIN_LENGTH);
  if (!isValidPasswordLength) {
    return [
      isValidPasswordLength,
      `Password should be at least ${PASSWORD_MIN_LENGTH} characters long!`,
    ];
  }

  return [true, ""];
};

export default isValidPassword;
