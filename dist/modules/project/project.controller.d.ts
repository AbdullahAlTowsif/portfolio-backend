import { Request, Response } from "express";
export declare const ProjectController: {
    createProject: (req: Request, res: Response) => Promise<void>;
    getAllProjects: (req: Request, res: Response) => Promise<void>;
    getProjectById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProject: (req: Request, res: Response) => Promise<void>;
    deleteProject: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=project.controller.d.ts.map