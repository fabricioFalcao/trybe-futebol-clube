import { compareSync } from 'bcryptjs';
import { Login } from '../../types/EndpointResponse';
import { ServiceResponse } from '../../types/ServiceResponse';
import { Token } from '../../types/Token';
import IUserService from '../../Interfaces/users/IUserService';
import SeqUserModel from '../../database/models/SeqUserModel';
import IUser from '../../Interfaces/users/IUser';
import jwtTokenUtility from '../../utils/jwtTokenUtility';

export default abstract class UserService implements IUserService {
  constructor(protected model = SeqUserModel) { }

  protected abstract userByEmail(email: IUser['email']): Promise<IUser | null>;

  public async userLogin(login: Login): Promise<ServiceResponse<Token>> {
    const registeredUser = await this.userByEmail(login.email);

    if (!registeredUser || !compareSync(login.password, registeredUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { email, id, role } = registeredUser;

    const token = jwtTokenUtility.sign({ id, email, role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
