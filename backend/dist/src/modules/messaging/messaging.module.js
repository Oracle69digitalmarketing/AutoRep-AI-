"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingModule = void 0;
const common_1 = require("@nestjs/common");
const messaging_controller_1 = require("./messaging.controller");
const messaging_service_1 = require("./messaging.service");
const chat_gateway_1 = require("./chat.gateway");
const ai_module_1 = require("../ai/ai.module");
const sqs_module_1 = require("../../infra/sqs.module");
const crm_module_1 = require("../crm/crm.module");
let MessagingModule = class MessagingModule {
};
exports.MessagingModule = MessagingModule;
exports.MessagingModule = MessagingModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => ai_module_1.AiModule), sqs_module_1.SqsModule, crm_module_1.CrmModule],
        controllers: [messaging_controller_1.MessagingController],
        providers: [messaging_service_1.MessagingService, chat_gateway_1.ChatGateway],
        exports: [messaging_service_1.MessagingService, chat_gateway_1.ChatGateway],
    })
], MessagingModule);
//# sourceMappingURL=messaging.module.js.map