import {Role} from '../../../core/models/role';

export class LoginResponse {
  login: string;
  token: string;
  roles: Role[];
}
