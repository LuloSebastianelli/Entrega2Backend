import mongoose from "mongoose";
import { createHash } from "../utils.js";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: String, unique: true },
    role: { type: String, required: true, default: 'user' }
});

//middleware para hash password
userSchema.pre('save', function (next) {
    if(!this.isModified('password')) return next();
    this.password = createHash(this.password);
    next();
})


export default mongoose.model('User', userSchema)