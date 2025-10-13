"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const worker_module_1 = require("./worker.module");
const sqs_consumer_service_1 = require("./modules/tasks/sqs-consumer.service");
let app;
async function bootstrap() {
    if (!app) {
        app = await core_1.NestFactory.createApplicationContext(worker_module_1.WorkerModule);
    }
    return app;
}
const handler = async (event) => {
    const appContext = await bootstrap();
    const sqsConsumerService = appContext.get(sqs_consumer_service_1.SqsConsumerService);
    await sqsConsumerService.processMessages(event.Records);
};
exports.handler = handler;
//# sourceMappingURL=worker.js.map