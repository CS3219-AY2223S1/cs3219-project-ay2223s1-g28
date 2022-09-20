import 'dotenv/config';

import { ormCreateUser as _createUser, authenticateUser, isExistingUser, isExistingEmail, ormDeleteAccount } from '../model/user-orm.js';
import { blacklistJwt, generateJwt, decodeJwt } from '../model/jwt.js';

export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (username && email && password) {
            if (await isExistingUser(username)) {
                return res.status(409).json({message: 'Existing username!'});
            }

            if (await isExistingEmail(email)) {
                return res.status(409).json({message: 'Email has already been taken!'});
            }
            
            const resp = await _createUser(username, email, password);
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
            const token = generateJwt(signedInUser);
            // Send cookie
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: 'Missing username and/or password.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error when signing in user.' });
    }
}

export async function logout(req, res) {
    const { token } = req;
    await blacklistJwt(token);
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful.'})
}

export async function deleteAccount(req, res) {
    const { token } = req;
    const { username } = decodeJwt(token);
    await blacklistJwt(token);
    res.clearCookie('token');
    if (await ormDeleteAccount(username)) {
        return res.status(200).json({ message: `Deleted account ${username} successfully.` });
    } else {
        return res.status(409).json({ message: 'Account does not exist / delete unsuccessful.' });
    }
}

export function acknowledgeJWTValidity(req, res) {
    res.status(200).json({ message: 'Valid JWT!' });
}
