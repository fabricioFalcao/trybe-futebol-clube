import ITeam from '../../Interfaces/teams/ITeam';
import TeamsService from './TeamsService';

export default class SeqTeamsTest extends TeamsService {
  protected async team(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }

  protected async teamsList(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map((team) => team.dataValues);
  }
}
