import { Router } from "express";
import { isLoggedIn, isLoggedOut } from "../middleware/auth.js";

const router = Router();

router.get('/register', isLoggedOut, (req, res) => res.render('register'));

router.get('/login', isLoggedOut, (req, res) => res.render('login'));

router.get("/current", isLoggedIn, (req, res) =>
    res.render("current", { currentUser: req.user })
  );

export default router;