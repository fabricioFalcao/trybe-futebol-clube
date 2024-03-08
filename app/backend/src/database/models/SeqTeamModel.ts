import {
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';

class SeqTeamModel extends Model
  <InferAttributes<SeqTeamModel>, InferCreationAttributes<SeqTeamModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SeqTeamModel.init(
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
    modelName: 'Team',
    timestamps: false,
    underscored: true,
    tableName: 'teams',
  },
);

export default SeqTeamModel;
