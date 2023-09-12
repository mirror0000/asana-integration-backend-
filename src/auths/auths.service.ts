import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'querystring';
import { cloud } from '../conf';
import fetch from 'node-fetch';

@Injectable()
export class AuthsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getAsanaLoginUrl() {
    
    const state = Math.random().toString();
    const clinetId = this.configService.get('CLIENT_ID');
    const redirect_uri = this.configService.get('CLIENT_CALLBACK');
    const scope = 'default';
    
    const authUrl = 'https://app.asana.com/-/oauth_authorize?' + querystring.stringify({
      client_id: clinetId,
      redirect_uri: redirect_uri,
      response_type: 'code',
      state: state,
      scope: scope
    });

    return authUrl;
    
    // return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=cLDX4jo5plesLQJP04h6h2DSHzAzAGys&scope=offline_access%20read%3Auser%3Ajira%20read%3Aapplication-role%3Ajira%20read%3Aavatar%3Ajira%20read%3Agroup%3Ajira%20read%3Apermission%3Ajira%20read%3Aproject%3Ajira%20read%3Ajira-work%20write%3Ajira-work%20read%3Ajira-user&redirect_uri=https%3A%2F%2Fjira-integration-six.vercel.app%2Fjira%2Fcallback&state=${state}&response_type=code&prompt=consent`;
    // return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=cLDX4jo5plesLQJP04h6h2DSHzAzAGys&scope=offline_access%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20read%3Ajira-user%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=https%3A%2F%2Fjira-integration-six.vercel.app%2Fjira%2Fcallback&state=${state}&response_type=code&prompt=consent`;
  }

  async authorize(code: string) {
    const redirectUri = this.configService.get('CLIENT_CALLBACK');
    const clientId = this.configService.get('CLIENT_ID');
    const clientSecret = this.configService.get('CLIENT_SECRET');
    console.log('authorize code', code);
    const url = 'https://app.asana.com/-/oauth_token';
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        // Use the access token and refresh token to make API requests
        // Save the tokens securely for future use
        return data;
      } else {
        // res.send('Authentication failed!');
        return null;
      }
    } catch (error) {
      // res.send(`Error: ${error}`);
      return error;
    }

  }

  // async getAccessible(access_token: string) {

  //   const url = 'https://api.atlassian.com/oauth/token/accessible-resources';

  //   const token = 'Bearer ' + access_token;

  //   const response = await fetch(url, {
  //     headers: {
  //       'Authorization': token,
  //       'Accept': 'application/json'
  //     }
  //   });

  //   const json = await response.json();
  //   cloud.id = json[0]?.id;
  //   return json[0];


  // }
}
