const express = require('express')
const Post = require('../models/Posts')

//create an instance of our router
const router = express.Router();

//Create api endpoint to get all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        
        //send response to client
        res.status(200).json({ message: "Posts fetched successfully", posts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Create api endpoint to create new post
router.post("/create-post", async (req, res) => {
    try {
        //get all the data from request body
        const { title, content, author, postCover, tags, category } = req.body;
        //verify that all data is available and not malicious
        if (!title || !content || !author || !category) {
            return res.status(400).json({ message: "All fields are required" })
        }
        //create post and save to database
        const newPost = new Post({
            title,
            content,
            author,
            postCover,
            tags,
            category
        });
        await newPost.save();
        //send response to client
        res.status(201).json({ message: "Post created successfully", post: newPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//api endpoint to fetch post by _id
router.get("/find-post/:id", async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id);
        res.status(200).json({ message: "Post fetched successfully", data: post })    
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//api endpoint to delete post by id
router.delete("/delete-post/:id", async (req, res) => {
    const id = req.params.id
    try {
        const result = await Post.deleteOne({ _id: id })

        //more advanced method to delete posts
        // const deletePost = await Post.findByIdAndDelete({ _id: id })

        // if(!deletePost) {
        //     return res.status(404).json({ message: "Post not found" })
        // }

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Post not found" })
        }

        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//api endpoint to filter post by id
router.get("/filter-post/:cat", async (req, res) => {
    const category = req.params.cat
    try {
        const posts = await Post.find({ category: new RegExp(`^${category}$`, "i") })
        res.status(200).json({ message: "Posts fetched successfully", data: posts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//api endpoint to update post
router.put("/update-post/:id", async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true } //ensures the updated data is returned
        )
        res.status(200).json({ message: "Post updated successfully", data: post })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//export the router
module.exports = router;

