import bcrypt from 'bcrypt';

import { createUser, getUserPassword } from './repository.js';

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

export async function ormSignin(username, password) {
    try {
        const hashedPassword = await getUserPassword(username);
        const isMatch = await bcrypt.compare(password, hashedPassword['password']);
        if (!isMatch) {
            throw new Error("Input password does not match hashed password!");
        }
        return true;
    } catch (err) {
        console.log('ERROR: Signin failed!');
        return { err };
    }
}
