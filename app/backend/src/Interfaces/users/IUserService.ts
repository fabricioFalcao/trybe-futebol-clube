import { Role } from '../../types/Role';
import { Token } from '../../types/Token';
import { ServiceResponse } from '../../types/ServiceResponse';
import IUser from './IUser';

export default interface IUserService {
  userLogin(email: IUser['email'], password: IUser['password']): Promise<ServiceResponse<Token>>,
  userRole(id: IUser['id']): Promise<ServiceResponse<Role>>
}
