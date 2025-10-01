export declare const AuthService: {
    loginWithCredentials: ({ email, password }: {
        email: string;
        password: string;
    }) => Promise<{
        id: number;
        email: string;
        password: string | null;
        name: string;
        picture: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map