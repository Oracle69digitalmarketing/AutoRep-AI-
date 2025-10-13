export declare class S3Service {
    private client;
    private bucketName;
    constructor();
    putObject(key: string, body: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    getObject(key: string): Promise<import("@aws-sdk/client-s3").GetObjectCommandOutput>;
}
