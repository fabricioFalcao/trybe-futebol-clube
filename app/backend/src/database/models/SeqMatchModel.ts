import {
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';
import SeqTeamModel from './SeqTeamModel';

class SeqMatchModel extends Model
  <InferAttributes<SeqMatchModel>, InferCreationAttributes<SeqMatchModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SeqMatchModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Match',
    timestamps: false,
    underscored: true,
    tableName: 'matches',
  },
);

SeqMatchModel.belongsTo(SeqTeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SeqMatchModel.belongsTo(SeqTeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SeqTeamModel.hasMany(SeqMatchModel, { foreignKey: 'homeTeamId' });
SeqTeamModel.hasMany(SeqMatchModel, { foreignKey: 'awayTeamId' });

export default SeqMatchModel;
