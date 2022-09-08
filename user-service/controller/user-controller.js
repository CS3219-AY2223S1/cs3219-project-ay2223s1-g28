import 'dotenv/config'
import jwt from 'jsonwebtoken';

import { ormCreateUser as _createUser, authenticateUser, isExistingUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            if (await isExistingUser(username)) {
                return res.status(409).json({message: 'Existing username!'});
            }
            
            const resp = await _createUser(username, password);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

// Returns an acess token upon successful sign in, else the corresponding error message
export async function signin(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            // Authenticate user
            const signedInUser = await authenticateUser(username, password);
            if (!signedInUser) {
                return res.status(401).json({ message: 'User does not exist and/or wrong password.' });
            }
            // Create JWT
            const token = jwt.sign(signedInUser, process.env.JWT_SECRET_KEY);
            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: 'Missing username and/or password.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error when signing in user.' });
    }
}
