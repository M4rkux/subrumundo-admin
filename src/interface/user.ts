export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ILoggedUser {
  user: IUser;
  token: string;
}
