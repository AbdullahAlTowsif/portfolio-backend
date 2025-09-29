import { Request, Response } from "express";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response) => {
    try {
        const result = await BlogService.createBlog(req.body)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";

        const result = await BlogService.getAllBlogs({ page, limit, search });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch blogs", details: err });
    }
};

const getBlogById = async (req: Request, res: Response) => {
    const blog = await BlogService.getBlogById(Number(req.params.id));
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
};

const updateBlog = async (req: Request, res: Response) => {
    const blog = await BlogService.updateBlog(Number(req.params.id), req.body);
    res.json(blog);
};

const deleteBlog = async (req: Request, res: Response) => {
    await BlogService.deleteBlog(Number(req.params.id));
    res.json({ message: "Blog deleted" });
};


const getBlogStat = async (req: Request, res: Response) => {
    try {
        const result = await BlogService.getBlogStat();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats", details: err });
    }
};

export const BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogStat
}