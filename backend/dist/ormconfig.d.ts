export declare const AppDataSource: {
    getRepository: (entity: any) => {
        count: () => Promise<number>;
        find: (options: any) => Promise<never[]>;
    };
};
