import bcrypt from 'bcrypt';

import { createUser, deleteAccountByUsername, getUserByUsername, getUserByEmail } from './repository.js';

const saltRounds = 10;

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, email, password) {
    try {
        bcrypt.hash(password, saltRounds, async function(err, hashedPassword) {
            const newUser = await createUser({username, email: email.toLowerCase(), password: hashedPassword});
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
    let user = await getUserByUsername(username);
    user = user ? user : await getUserByEmail(username); // Allow signin using email too

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

// Checks if username exists in database
export async function isExistingUser(username) {
    const user = await getUserByUsername(username);
    return user ? true : false;
}

// Checks if email exists in database
export async function isExistingEmail(email) {
    const user = await getUserByEmail(email.toLowerCase());
    return user ? true : false;
}

// Returns true upon successful deletion
export async function ormDeleteAccount(username) {
    const d = await deleteAccountByUsername(username);
    return d.deletedCount == 1;
}
