import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private cognitoClient;
    private clientId;
    constructor(jwtService: JwtService);
    register(username: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<any>;
}
