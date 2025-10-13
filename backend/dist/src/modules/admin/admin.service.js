"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const ormconfig_1 = require("../../../ormconfig");
const lead_entity_1 = require("../../entities/lead.entity");
let AdminService = class AdminService {
    constructor() {
        this.leadRepo = ormconfig_1.AppDataSource.getRepository(lead_entity_1.Lead);
    }
    async getLeadsSummary() {
        const count = await this.leadRepo.count();
        const top = await this.leadRepo.find({ order: { score: 'DESC' }, take: 10 });
        return { totalLeads: count, topLeads: top };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map