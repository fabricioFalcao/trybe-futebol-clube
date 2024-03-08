import ITeamsService from '../../Interfaces/teams/ITeamsService';
import SeqTeamsModel from '../../database/models/SeqTeamsModel';
import ITeam from '../../Interfaces/teams/ITeam';
import { ServiceResponse } from '../../types/ServiceResponse';

export default abstract class TeamsService implements ITeamsService {
  protected model = SeqTeamsModel;

  protected abstract teamsList(): Promise<ITeam[]>;

  protected abstract team(id: number): Promise<ITeam | null>;

  async findAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.teamsList();
    return { status: 'SUCCESSFUL', data };
  }

  async findTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const data = await this.team(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data };
  }
}
