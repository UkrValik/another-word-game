import { baseUrl, configHeaders, headers, retryNum } from './utils';

const login = async (body: { email: string; password: string }) => {
  for (let i = 0; i < retryNum; ++i) {
    const loginResponse = await fetch(baseUrl + 'auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (loginResponse.ok) {
      return await loginResponse.json(); // { access_token }
    }
    if (loginResponse.status < 500) break;
  }
  throw new Error('Wrong login or password');
};

const register = async (body: { email: string; password: string }) => {
  for (let i = 0; i < retryNum; ++i) {
    const registerResponse = await fetch(baseUrl + 'auth/register', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (registerResponse.ok) {
      return await registerResponse.json(); // { user, access_token }
    }
    if (registerResponse.status < 500) break;
  }
  throw new Error('User already exists');
};

const userInfoGet = async (token: string) => {
  for (let i = 0; i < retryNum; ++i) {
    const infoResponse = await fetch(baseUrl + 'user/info', {
      headers: configHeaders(token),
    });
    if (infoResponse.ok) {
      return await infoResponse.json(); // user
    }
  }
  throw new Error('Could not fetch user info');
};

export { login, register, userInfoGet };
