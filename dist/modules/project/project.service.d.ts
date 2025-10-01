import { Prisma, Project } from "@prisma/client";
export declare const ProjectService: {
    createProject: (payload: Prisma.ProjectCreateInput) => Promise<Project>;
    getAllProjects: ({ page, limit, search }: {
        page?: number;
        limit?: number;
        search?: string;
    }) => Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            techStack: string[];
            category: string;
            features: string[];
            githubLink: string;
            liveLink: string;
            thumbnail: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProjectById: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        techStack: string[];
        category: string;
        features: string[];
        githubLink: string;
        liveLink: string;
        thumbnail: string;
    } | null>;
    updateProject: (id: number, data: Partial<any>) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        techStack: string[];
        category: string;
        features: string[];
        githubLink: string;
        liveLink: string;
        thumbnail: string;
    }>;
    deleteProject: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        techStack: string[];
        category: string;
        features: string[];
        githubLink: string;
        liveLink: string;
        thumbnail: string;
    }>;
};
//# sourceMappingURL=project.service.d.ts.map