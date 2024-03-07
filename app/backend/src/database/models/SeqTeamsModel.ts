import {
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';

class SeqTeamsModel extends Model
  <InferAttributes<SeqTeamsModel>, InferCreationAttributes<SeqTeamsModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SeqTeamsModel.init(
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

export default SeqTeamsModel;
