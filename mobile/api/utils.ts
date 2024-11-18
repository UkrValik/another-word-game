const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
const retryNum = 5;
const headers = {
  'Content-Type': 'application/json',
};
const configHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
});

export { baseUrl, retryNum, headers, configHeaders };
