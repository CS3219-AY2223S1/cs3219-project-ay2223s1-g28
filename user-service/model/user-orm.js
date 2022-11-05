import bcrypt from 'bcrypt';

import { getUserByUsername, getUserByEmail, createUser, updateUser, deleteUser } from './user-repo.js';

const saltRounds = 10;

export const checkExistence = async (username, email) => {
  if (await getUserByUsername(username) || await getUserByEmail(email.toLowerCase())) {
    return true;
  }
  return false;
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
  const updatedUser = await updateUser(username, newProfile);
  
  // Check if the updated user is indeed updated if user exists
  const usernameIsUpdated = !updatedUser || !newProfile.username || (updatedUser.username === newProfile.username);
  const passwordIsUpdated = !updatedUser || !newProfile.password || (updatedUser.password === newProfile.password);

  return usernameIsUpdated && passwordIsUpdated ? updatedUser : null;
};

// Deletes user if exists
export const ormDeleteUser = async (username) => {
  await deleteUser(username);
};
