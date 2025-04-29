import { Router } from "express";
import { isLoggedIn, isLoggedOut } from "../middleware/auth.js";
import passport from "passport";

const router = Router();

router.get('/register', isLoggedOut, (req, res) => res.render('register'));

router.get('/login', isLoggedOut, (req, res) => res.render('login'));

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) =>
    res.render("current", { currentUser: req.user })
  );

export default router;