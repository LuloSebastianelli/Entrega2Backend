import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY;
const JWT_EXPIRES_TIME_TOKEN = config.JWT_EXPIRES_TIME_TOKEN;

export const generateToken = (user) => {
    const token = JsonWebTokenError.sign(user, JWT_PRIVATE_KEY, {expiresIn: '24h'});
    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({error: 'Token no proporcionado'});
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).json({error: 'Token inválido'});
        req.user = credentials;
        next();
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {__dirname};

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

