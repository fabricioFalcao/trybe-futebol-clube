import { SeqTeamsModel } from '../database/models';
import ITeamsService from '../Interfaces/teams/ITeamsServicel';
import ITeam from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../types/ServiceResponse';

export default class SeqTeamsService implements ITeamsService {
  private model = SeqTeamsModel;

  async findAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.model.findAll();
    const teamsList = data.map((team) => team.dataValues);
    return { status: 'SUCCESSFUL', data: teamsList };
  }

  async findTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const data = await this.model.findByPk(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    const team = data.dataValues;
    return { status: 'SUCCESSFUL', data: team };
  }
}
