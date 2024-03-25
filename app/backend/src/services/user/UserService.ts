import { compareSync } from 'bcryptjs';
import SeqUserModelDAO from '../../models DAO/SeqUserModel';
import { Login } from '../../types/EndpointResponse';
import { ServiceResponse } from '../../types/ServiceResponse';
import { Token } from '../../types/Token';
import jwtTokenUtility from '../../utils/jwtTokenUtility';
import IUserModel from '../../Interfaces/users/IUserModel';

export default class UserService {
  constructor(private model: IUserModel = new SeqUserModelDAO()) { }

  public async userLogin(login: Login): Promise<ServiceResponse<Token>> {
    const registeredUser = await this.model.findUserByEmail(login.email);

    if (!registeredUser || !compareSync(login.password, registeredUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { email, id, role } = registeredUser;

    const token = jwtTokenUtility.sign({ id, email, role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
