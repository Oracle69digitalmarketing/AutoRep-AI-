"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const ai_module_1 = require("./modules/ai/ai.module");
const messaging_module_1 = require("./modules/messaging/messaging.module");
const funnels_module_1 = require("./modules/funnels/funnels.module");
const crm_module_1 = require("./modules/crm/crm.module");
const auth_module_1 = require("./modules/auth/auth.module");
const commissions_module_1 = require("./modules/commissions/commissions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [ai_module_1.AiModule, messaging_module_1.MessagingModule, funnels_module_1.FunnelsModule, crm_module_1.CrmModule, auth_module_1.AuthModule, commissions_module_1.CommissionsModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map