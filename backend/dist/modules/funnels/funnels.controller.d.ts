import { FunnelsService } from './funnels.service';
export declare class FunnelsController {
    private readonly funnelsService;
    constructor(funnelsService: FunnelsService);
    saveFunnel(funnelData: any): Promise<{
        funnelId: `${string}-${string}-${string}-${string}-${string}`;
    }>;
}
