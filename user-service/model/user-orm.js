import bcrypt from 'bcrypt';

import { createUser, getUserByUsername } from './repository.js';

const saltRounds = 10;

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        bcrypt.hash(password, saltRounds, async function(err, hashedPassword) {
            const newUser = await createUser({username, password: hashedPassword});
            newUser.save();
        });
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

// Returns the authenticated user, or null if not authenticated
export async function authenticateUser(username, password) {
    // Check if user exists
    const user = await getUserByUsername(username);
    if (!user) {
        return null;
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    return user.toObject();
}

// checks if username exists in database
export async function isExistingUser(username) {
    const user = await getUserByUsername(username);
    if (user) {
        return true;
    } else {
        return false;
    }
}
