import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY

export const isLoggedIn =  (req, res, next) => {
    const authHeader = req.cookies.currentUser;
    if (!authHeader)
        res.render('login');
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if (error) res.render('login');
        req.user = credentials;
        next();
    })
}

export const isLoggedOut = (req, res, next) => {
    const authHeader = req.cookies.currentUser;
    if (authHeader) res.render('current');
    next();
}