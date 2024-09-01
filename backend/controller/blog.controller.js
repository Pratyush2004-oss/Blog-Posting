import { Blog } from "../model/blog.model.js";

// Post blog
export const PostBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.id;
        if (!title || !description) {
            return res.status(400).json({
                message: "Someting is missing",
                success: false,
            })
        }
        const blog = await Blog.create({
            title,
            description,
            user: userId
        });
        return res.status(201).json({
            message: "New blog created",
            blog,
            success: true
        })
    } catch (error) {
        console.log('Error in PostBlog Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
        if (!blogs) {
            return res.status(404).json({
                message: "No blog found",
                success: false
            })
        }
        return res.status(200).json({
            blogs,
            success: true
        })

    } catch (error) {
        console.log('Error in getAllBlogs Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })

    }
}

// Get User blog
export const getUserBlogs = async (req, res) => {
    try {
        const userId = req.id;
        const blogs = await Blog.find({ user: userId }).sort({ createdAt: -1 })
        if (!blogs) {
            return res.status(404).json({
                message: "No blog found",
                success: false
            })
        }
        return res.status(200).json({
            blogs,
            success: true
        })

    } catch (error) {
        console.log('Error in blogs Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// get all favorite blog
export const getUserFavouriteBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({ favourite: true }).sort({ createdAt: -1 })
        if (!blogs) {
            return res.status(404).json({
                message: "No blog found",
                success: false
            })
        }
        return res.status(200).json({
            blogs,
            success: true
        })

    } catch (error) {
        console.log('Error in getUserFavouriteBlog Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })

    }
}

// getblog by blogId
export const getBlogByID = async (req, res) => {
    try {
        const blogId = req.params.id;

        // find blog by blogId
        const blog = await Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json({
                message: "No blog found",
                success: false
            })
        }
        return res.status(200).json({
            blog,
            success: true
        })
    } catch (error) {
        console.log('Error in getBlogByID Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// update blog by id as Favourite
export const updateBlogFavourite = async (req, res) => {
    try {
        const { status } = req.body;
        const blogId = req.params.id;

        // find blog by blogId
        const blog = await Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json({
                message: "No blog found",
                success: false
            })
        }
        // update as Important
        blog.favourite = status;
        await blog.save();

        return res.status(200).json({
            message: "Status updated Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in updateBlogFavourite Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// delete a blog
export const DeleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.id;

        // find blog to delete
        const blog = await Blog.findOneAndDelete({ user: userId, _id: blogId });
        if (!blog) {
            return res.status(404).json({
                message: "No blog found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Blog deleted Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in DeleteBlog Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}