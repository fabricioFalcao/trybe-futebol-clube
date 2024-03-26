import IUser from './IUser';

export default interface IUserModel {
  findUserByEmail(email: string): Promise<IUser | null>,
}
