"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const ormconfig_1 = require("../../../ormconfig");
const task_entity_1 = require("../../entities/task.entity");
let TasksService = class TasksService {
    constructor() {
        this.repo = ormconfig_1.AppDataSource.getRepository(task_entity_1.Task);
    }
    async createTask(dto) {
        const t = new task_entity_1.Task();
        t.title = dto.title;
        t.dueDate = dto.dueDate;
        return this.repo.save(t);
    }
    async listTasks() {
        return this.repo.find({ order: { createdAt: 'DESC' } });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map