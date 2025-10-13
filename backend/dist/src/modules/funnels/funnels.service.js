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
exports.FunnelsService = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("../../infra/s3.service");
const crypto_1 = require("crypto");
let FunnelsService = class FunnelsService {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async saveFunnel(funnelData) {
        const funnelId = (0, crypto_1.randomUUID)();
        const key = `funnels/${funnelId}.json`;
        await this.s3Service.putObject(key, JSON.stringify(funnelData));
        return { funnelId };
    }
};
exports.FunnelsService = FunnelsService;
exports.FunnelsService = FunnelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], FunnelsService);
//# sourceMappingURL=funnels.service.js.map