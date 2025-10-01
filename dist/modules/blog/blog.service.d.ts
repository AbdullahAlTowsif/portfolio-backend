import { Blog, Prisma } from "@prisma/client";
export declare const BlogService: {
    createBlog: (payload: Prisma.BlogCreateInput) => Promise<Blog>;
    getAllBlogs: ({ page, limit, search }: {
        page?: number;
        limit?: number;
        search?: string;
    }) => Promise<{
        data: ({
            author: {
                id: number;
                email: string;
                password: string | null;
                name: string;
                picture: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            picture: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            views: number;
            authorId: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getBlogById: (id: number) => Promise<({
        author: {
            id: number;
            email: string;
            password: string | null;
            name: string;
            picture: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        picture: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        views: number;
        authorId: number;
    }) | null>;
    updateBlog: (id: number, data: Partial<any>) => Promise<{
        id: number;
        picture: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        views: number;
        authorId: number;
    }>;
    deleteBlog: (id: number) => Promise<{
        id: number;
        picture: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        views: number;
        authorId: number;
    }>;
    getBlogStat: () => Promise<{
        stats: {
            totalPosts: number;
            totalViews: number;
            avgViews: number;
            minViews: number;
            maxViews: number;
        };
        lastWeekPostCount: number;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map