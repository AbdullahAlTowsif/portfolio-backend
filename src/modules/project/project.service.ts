import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
    // console.log(payload);
    const result = await prisma.project.create({
        data: payload,
    })

    return result;
}

const getAllProjects = async ({
    page = 1,
    limit = 10,
    search
}: {
    page?: number,
    limit?: number,
    search?: string
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]

            },
        ].filter(Boolean)
    }

    const result = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.project.count({ where })

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getProjectById = async (id: number) => {
    return await prisma.project.findUnique({
        where: { id }
    });
};

const updateProject = async (id: number, data: Partial<any>) => {
    return prisma.project.update({ where: { id }, data });
};

const deleteProject = async (id: number) => {
    return prisma.project.delete({ where: { id } });
};


export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
}