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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
    underscored: true,
    tableName: 'users',
  },
);

export default SeqUserModel;
