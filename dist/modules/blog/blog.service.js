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
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    const result = yield db_1.prisma.blog.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    return result;
});
const getAllBlogs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, search }) {
    const skip = (page - 1) * limit;
    const where = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            },
        ].filter(Boolean)
    };
    const result = yield db_1.prisma.blog.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const total = yield db_1.prisma.blog.count({ where });
    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.blog.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });
        return yield tx.blog.findUnique({
            where: { id },
            include: { author: true },
        });
    }));
});
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.update({ where: { id }, data });
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.delete({ where: { id } });
});
const getBlogStat = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const aggregates = yield tx.blog.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
        });
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekPostCount = yield tx.blog.count({
            where: {
                createdAt: {
                    gte: lastWeek
                }
            }
        });
        return {
            stats: {
                totalPosts: (_a = aggregates._count) !== null && _a !== void 0 ? _a : 0,
                totalViews: (_b = aggregates._sum.views) !== null && _b !== void 0 ? _b : 0,
                avgViews: (_c = aggregates._avg.views) !== null && _c !== void 0 ? _c : 0,
                minViews: (_d = aggregates._min.views) !== null && _d !== void 0 ? _d : 0,
                maxViews: (_e = aggregates._max.views) !== null && _e !== void 0 ? _e : 0
            },
            lastWeekPostCount
        };
    }));
});
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogStat
};
//# sourceMappingURL=blog.service.js.map