import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postuser: {
        type: String,
        required: true
    },
    postname: {
        type: String,
        required: true
    },
    postbio: {
        type: String,
        required: true
    },
    postpath: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    emptype: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    imgloc: {
        type: String,
        required: true
    },
    likes: [String],
    comments: [{ name: String, comment: String, path: String }],
    applicants: [String]

}, { timestamps: true })

const posts = mongoose.models.posts || mongoose.model('posts', postSchema);
export default posts;