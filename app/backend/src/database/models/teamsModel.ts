import {
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model<InferAttributes<TeamsModel>, InferCreationAttributes<TeamsModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Teams',
    timestamps: false,
    underscored: true,
    tableName: 'teams',
  },
);

export default TeamsModel;
