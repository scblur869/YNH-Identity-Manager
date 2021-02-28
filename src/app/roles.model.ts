export interface IUserRole {
  id: number;
  name: string;
  displayname: string;
  description: string;
}

export class UserRole implements IUserRole {
  id!: number;
  name!: string;
  displayname!: string;
  description!: string;
}

export class RoleTableItem implements IUserRole {
  id!: number;
  name!: string;
  displayname!: string;
  description!: string;
}
