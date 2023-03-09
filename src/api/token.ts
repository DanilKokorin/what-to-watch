const ACCESS_TOKEN = 'ACCESS_TOKEN';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ?? '';
};

export const saveToken = (tokenVal: Token): void => {
  localStorage.setItem(ACCESS_TOKEN, tokenVal);
};

export const dropToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
};
