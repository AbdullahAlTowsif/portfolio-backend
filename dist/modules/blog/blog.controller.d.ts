import { Request, Response } from "express";
export declare const BlogController: {
    createBlog: (req: Request, res: Response) => Promise<void>;
    getAllBlogs: (req: Request, res: Response) => Promise<void>;
    getBlogById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateBlog: (req: Request, res: Response) => Promise<void>;
    deleteBlog: (req: Request, res: Response) => Promise<void>;
    getBlogStat: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=blog.controller.d.ts.map