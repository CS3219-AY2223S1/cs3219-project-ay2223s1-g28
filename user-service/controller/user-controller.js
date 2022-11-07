import 'dotenv/config';

import { 
  checkExistence,
  ormCreateUser as _createUser, 
  ormUpdateUser as _updateUser, 
  ormDeleteUser as _deleteUser,
} from '../model/user-orm.js';

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      // Check if user exists
      const isExisted = await checkExistence(username, email);
      if (isExisted) {
        return res.status(401).json({ message: 'User already exists.' });
      }

      // Create user
      await _createUser(username, email, password);
      return res.status(201).json({ message: `Account ${username} created successfully.` });
    } else {
      return res.status(400).json({ message: 'Username/Email/Password is/are missing.' });
    }
  } catch (_) {
    return res.status(500).json({ message: 'Server error when creating user.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const username = req.params.id; 
    const { newPassword } = req.body;
    const newProfile = {};
    // Only add to the new profile to update to if the value exists
    if (newPassword) {
      newProfile.password = newPassword;
    }
    // Directly return if newProfile is empty, no update
    if (
      newProfile && // null and undefined check
      Object.keys(newProfile).length === 0 &&
      Object.getPrototypeOf(newProfile) === Object.prototype
    ) {
      return res.status(200).json({ message: 'No update required.' });
    }
  
    // Update user
    await _updateUser(username, newProfile);
    return res.status(200).json({ message: `Account ${username} updated successfully.` });
  } catch (_) {
    return res.status(500).json({ message: 'Server error when updating profile.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const username = req.params.id;
    await _deleteUser(username);
    return res.status(200).json({ message: `Account ${username} deleted successfully.` });
  } catch (_) {
    return res.status(500).json({ message: 'Server error when deleting account.' });
  }
};
