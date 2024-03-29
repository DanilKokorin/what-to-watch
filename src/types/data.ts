export type AuthData = {
  identifier: string;
  password: string;
};

export type UserData = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};
