import mongoose from "mongoose";
import { createHash } from "../utils.js";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, default: 'user' }
});

//middleware para hash password
userSchema.pre('save', function (next) {
    if(!this.isModified('password')) return next();
    this.password = createHash(this.password);
    next();
})


export default mongoose.model('User', userSchema)