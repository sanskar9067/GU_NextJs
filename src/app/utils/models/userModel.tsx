import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
        default: ""
    },
    location: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
        default: "No Prior Experience"
    },
    position: {
        type: String,
        required: true,
        default: "No Prior Experience"
    },
    education: {
        type: String,
        required: true,
        default: "No educational background"
    }
}, { timestamps: true });

const user = mongoose.models.users || mongoose.model('users', userSchema);

export default user;