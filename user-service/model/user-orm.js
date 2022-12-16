import bcrypt from 'bcrypt';

import { getUserByUsername, getUserByEmail, createUser, updateUser, deleteUser } from './user-repo.js';

const saltRounds = 10;

export const checkExistence = async (username, email) => {
  return await getUserByUsername(username) || await getUserByEmail(email.toLowerCase())
    ? true 
    : false;
};

export const ormCreateUser = async (username, email, password) => {
  bcrypt.hash(password, saltRounds, async (_, hashedPassword) => {
    await createUser(username, email.toLowerCase(), hashedPassword);
  });
};

// Returns updated user upon successful update, or null if update fails
export const ormUpdateUser = async (username, newProfile) => {
  if (newProfile.password) {
    newProfile.password = await bcrypt.hash(newProfile.password, saltRounds);
  }
  await updateUser(username, newProfile);
};

// Deletes user if exists
export const ormDeleteUser = async (username) => {
  await deleteUser(username);
};
