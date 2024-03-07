import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import SeqTeamsModel from './SeqTeamsModel';

const sequelize = new Sequelize(config)

export default sequelize;

export {
  SeqTeamsModel
}
