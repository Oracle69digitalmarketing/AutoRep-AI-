"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelExecutionService = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("../../infra/s3.service");
const messaging_service_1 = require("../messaging/messaging.service");
const crm_service_1 = require("../crm/crm.service");
let FunnelExecutionService = class FunnelExecutionService {
    constructor(s3Service, messagingService, crmService) {
        this.s3Service = s3Service;
        this.messagingService = messagingService;
        this.crmService = crmService;
    }
    async executeFunnel(funnelId, leadId) {
        const key = `funnels/${funnelId}.json`;
        const funnel = await this.s3Service.getObject(key);
        if (!funnel || !funnel.Body) {
            throw new Error(`Funnel with id ${funnelId} not found`);
        }
        const funnelSteps = JSON.parse(funnel.Body.toString());
        const lead = await this.crmService.getLead(leadId);
        if (!lead || !lead.phone) {
            throw new Error(`Lead with id ${leadId} not found or has no phone number`);
        }
        for (const step of funnelSteps) {
            if (step.type === 'send-message') {
                await this.messagingService.sendMessage(lead.phone, step.message);
            }
            else if (step.type === 'wait-for-reply') {
                await new Promise(r => setTimeout(r, 5000));
            }
        }
        return { status: 'completed' };
    }
};
exports.FunnelExecutionService = FunnelExecutionService;
exports.FunnelExecutionService = FunnelExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service,
        messaging_service_1.MessagingService,
        crm_service_1.CrmService])
], FunnelExecutionService);
//# sourceMappingURL=funnel-execution.service.js.map