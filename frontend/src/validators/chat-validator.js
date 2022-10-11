import { isNotEmpty } from './generic-validator';

const isValidChat = (value) => {
  return [isNotEmpty(value), 'Chat message cannot be empty!'];
};

export default isValidChat;