import {
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';

class SeqUserModel extends Model
  <InferAttributes<SeqUserModel>, InferCreationAttributes<SeqUserModel>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

SeqUserModel.init(
  {

  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
    underscored: true,

  },
);

export default SeqUsersModel;
