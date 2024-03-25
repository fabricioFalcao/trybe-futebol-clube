import ITeam from '../Interfaces/teams/ITeam';
import SeqTeamModel from '../database/models/SeqTeamModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';

export default class SeqTeamDao implements ITeamModel {
  private model = SeqTeamModel;

  async findTeamById(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }

  async findAllTeams(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map((team) => team.dataValues);
  }
}
