import IUser from '../../Interfaces/users/IUser';
import SeqUserModel from '../../database/models/SeqUserModel';
import UserService from './UserService';

export default class SeqUserService extends UserService {
  constructor() {
    super(SeqUserModel);
  }

  protected async userByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
