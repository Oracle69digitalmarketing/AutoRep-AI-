import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;
  private clientId = process.env.COGNITO_CLIENT_ID;

  constructor(private readonly jwtService: JwtService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
  }

  async register(username: string, password: string): Promise<any> {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: username,
      Password: password,
    });
    return this.cognitoClient.send(command);
  }

  async login(username: string, password: string): Promise<any> {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });
    try {
      const { AuthenticationResult } = await this.cognitoClient.send(command);
      if (AuthenticationResult) {
        const payload = { username: username, sub: AuthenticationResult.IdToken };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}