export interface IUserModel {
  id: number;
  username: string;
  displayname: string;
  password: string;
  email: string;
  role: string;
  isenabled: number;
}

export class UserModel implements IUserModel {
  id!: number;
  username!: string;
  displayname!: string;
  email!: string;
  role!: string;
  password!: string;
  isenabled!: number;
}

export class UserTableItem implements IUserModel {
  id!: number;
  username!: string;
  displayname!: string;
  password!: string;
  email!: string;
  role!: string;
  isenabled!: number;
}
