import { oAuthHeaders } from 'api/settings';
import { AuthorizationToken } from 'models/token/AuthorizationToken';
import { User } from 'models/user/User';

export const signIn = {
  url: process.env.REACT_APP_API_URL + '/Authorization/SignIn',
  preparePayload: (platformCode: string, name: string, username?: string, password?: string): RequestInit => {
    return {
      method: 'POST',
      headers: oAuthHeaders(),
      body: JSON.stringify({
        Device: {
          Username: username,
          password: password,
          PlatformCode: platformCode,
          Name: name,
        },
      }),
    };
  },
};

// signIn response
export class SignInResponse {
  User: User;
  AuthorizationToken: AuthorizationToken;
}
