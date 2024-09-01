import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { DeleteBlog, getAllBlogs, getBlogByID, getUserBlogs, getUserFavouriteBlog, PostBlog, updateBlogFavourite } from '../controller/blog.controller.js';

const router = express.Router();

router.route('/post').post(isAuthenticated, PostBlog)                                   // posting blogs
router.route('/get').get(isAuthenticated, getAllBlogs)                                  // get all blogs in the database
router.route('/get/:id').get(isAuthenticated, getBlogByID)                              // get single blog by id 
router.route('/getuserblogs').get(isAuthenticated, getUserBlogs)                        // get get blogs posted by user
router.route('/getfavourite').get(isAuthenticated, getUserFavouriteBlog)                // get favourite blogs
router.route('/:id/updatefavourite').post(isAuthenticated, updateBlogFavourite)         // set blog favourite
router.route('/:id/delete').get(isAuthenticated, DeleteBlog)                            // delete our own created blog

export default router;