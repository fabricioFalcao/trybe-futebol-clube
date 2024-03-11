import { Token } from '../../types/Token';
import { ServiceResponse } from '../../types/ServiceResponse';

import { Login } from '../../types/Login';

export default interface IUserService {
  userLogin(login: Login): Promise<ServiceResponse<Token>>,
  // userRole(id: IUser['id']): Promise<ServiceResponse<Role>>
}
