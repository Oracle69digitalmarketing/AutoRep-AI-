export declare class SqsService {
    private client;
    private queueUrl;
    constructor();
    sendMessage(messageBody: any): Promise<import("@aws-sdk/client-sqs").SendMessageCommandOutput>;
}
