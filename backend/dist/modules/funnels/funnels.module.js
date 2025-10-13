"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelsModule = void 0;
const common_1 = require("@nestjs/common");
const funnels_controller_1 = require("./funnels.controller");
const funnels_service_1 = require("./funnels.service");
const funnel_execution_service_1 = require("./funnel-execution.service");
const s3_module_1 = require("../../infra/s3.module");
const messaging_module_1 = require("../messaging/messaging.module");
const crm_module_1 = require("../crm/crm.module");
let FunnelsModule = class FunnelsModule {
};
exports.FunnelsModule = FunnelsModule;
exports.FunnelsModule = FunnelsModule = __decorate([
    (0, common_1.Module)({
        imports: [s3_module_1.S3Module, (0, common_1.forwardRef)(() => messaging_module_1.MessagingModule), crm_module_1.CrmModule],
        controllers: [funnels_controller_1.FunnelsController],
        providers: [funnels_service_1.FunnelsService, funnel_execution_service_1.FunnelExecutionService],
        exports: [funnel_execution_service_1.FunnelExecutionService],
    })
], FunnelsModule);
//# sourceMappingURL=funnels.module.js.map