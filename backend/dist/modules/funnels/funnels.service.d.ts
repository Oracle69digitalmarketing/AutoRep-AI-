import { S3Service } from '../../infra/s3.service';
export declare class FunnelsService {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    saveFunnel(funnelData: any): Promise<{
        funnelId: `${string}-${string}-${string}-${string}-${string}`;
    }>;
}
