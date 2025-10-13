export declare class DynamodbService {
    private client;
    private tableName;
    constructor();
    putItem(item: any): Promise<import("@aws-sdk/client-dynamodb").PutItemCommandOutput>;
    getItem(key: any): Promise<import("@aws-sdk/client-dynamodb").GetItemCommandOutput>;
    updateItem(key: any, updateExpression: string, expressionAttributeValues: any): Promise<import("@aws-sdk/client-dynamodb").UpdateItemCommandOutput>;
    deleteItem(key: any): Promise<import("@aws-sdk/client-dynamodb").DeleteItemCommandOutput>;
    query(keyConditionExpression: string, expressionAttributeValues: any): Promise<import("@aws-sdk/client-dynamodb").QueryCommandOutput>;
}
