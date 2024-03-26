import IUser from '../Interfaces/users/IUser';
import SeqUserModel from '../database/models/SeqUserModel';
import IUserModel from '../Interfaces/users/IUserModel';

export default class SeqUserDao implements IUserModel {
  private model = SeqUserModel;

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
