import {Role} from './role';

export class User {
  id: number;
  email: string;
  password: string;
  roles: Role[];
}
