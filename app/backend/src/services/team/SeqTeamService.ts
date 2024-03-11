import SeqTeamModel from '../../database/models/SeqTeamModel';
import ITeam from '../../Interfaces/teams/ITeam';
import TeamService from './TeamService';

export default class SeqTeamService extends TeamService {
  constructor() {
    super(SeqTeamModel);
  }

  protected async team(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }

  protected async teamsList(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map((team) => team.dataValues);
  }
}
