import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
}, { timestamps: true })
export const Blog = mongoose.model("Blog", BlogSchema)