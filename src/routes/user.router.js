import { Router } from "express";
import UserService from "../models/user.model.js";
import { isValidPassword, generateToken } from "../utils.js";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({error: 'Todos los campos son obligatorios'});
        }

        const newUser = new UserService({first_name, last_name, email, age, password});

        await newUser.save();

        res.status(201).json({message: 'Usuario creado'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({error: 'Todos los campos son obligatorios'});
        }

        const user = await UserService.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'Usuario no encontrado'});
        }

        if(!isValidPassword(user, password)) {
            return res.status(401).json({error: 'Contraseña incorrecta'});
        }

        const jwt_token = generateToken({userId: user._id, role: user.role, name: user.first_name});
        res.cookie('currentUser', jwt_token, {httpOnly: true});

        res.json({message: 'Inicio de sesión exitoso'});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
})

export default router;