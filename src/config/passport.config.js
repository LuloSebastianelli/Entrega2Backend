import passport from 'passport';
import jwt from 'passport-jwt';
import cookieParser from 'cookie-parser';
import config from './config.js';

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['currentUser'];
    }
    return token;
}

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializePassport;