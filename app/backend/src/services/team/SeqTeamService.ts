import ITeam from '../../Interfaces/teams/ITeam';
import TeamService from './TeamService';

export default class SeqTeamService extends TeamService {
  protected async team(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }

  protected async teamsList(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map((team) => team.dataValues);
  }
}
