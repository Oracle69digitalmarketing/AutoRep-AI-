"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerModule = void 0;
const common_1 = require("@nestjs/common");
const crm_module_1 = require("./modules/crm/crm.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const ai_module_1 = require("./modules/ai/ai.module");
const messaging_module_1 = require("./modules/messaging/messaging.module");
const infra_module_1 = require("./infra/infra.module");
let WorkerModule = class WorkerModule {
};
exports.WorkerModule = WorkerModule;
exports.WorkerModule = WorkerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            crm_module_1.CrmModule,
            tasks_module_1.TasksModule,
            ai_module_1.AiModule,
            messaging_module_1.MessagingModule,
            infra_module_1.InfraModule,
        ],
    })
], WorkerModule);
//# sourceMappingURL=worker.module.js.map