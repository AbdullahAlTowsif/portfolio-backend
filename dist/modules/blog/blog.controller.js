"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blog_service_1 = require("./blog.service");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blog_service_1.BlogService.createBlog(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const result = yield blog_service_1.BlogService.getAllBlogs({ page, limit, search });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch blogs", details: err });
    }
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_service_1.BlogService.getBlogById(Number(req.params.id));
    if (!blog)
        return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_service_1.BlogService.updateBlog(Number(req.params.id), req.body);
    res.json(blog);
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_service_1.BlogService.deleteBlog(Number(req.params.id));
    res.json({ message: "Blog deleted" });
});
const getBlogStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blog_service_1.BlogService.getBlogStat();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch stats", details: err });
    }
});
exports.BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogStat
};
//# sourceMappingURL=blog.controller.js.map