import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minlength: 2,
        maxlength:50
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address.'],
        // TODO: Replace with validator library for production
        // validator.isEmail provides more robust email validation
        // npm install validator
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        // TODO: also try to use validator library to handle password validation
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;