import { Token } from '../../types/Token';
import { ServiceResponse } from '../../types/ServiceResponse';

import { Login } from '../../types/EndpointResponse';

export default interface IUserService {
  userLogin(login: Login): Promise<ServiceResponse<Token>>,
}
