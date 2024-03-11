import ITeamService from '../../Interfaces/teams/ITeamService';
import SeqTeamModel from '../../database/models/SeqTeamModel';
import ITeam from '../../Interfaces/teams/ITeam';
import { ServiceResponse } from '../../types/ServiceResponse';

export default abstract class TeamService implements ITeamService {
  constructor(protected model = SeqTeamModel) { }

  protected abstract teamsList(): Promise<ITeam[]>;

  protected abstract team(id: number): Promise<ITeam | null>;

  public async findAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.teamsList();
    return { status: 'SUCCESSFUL', data };
  }

  public async findTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const data = await this.team(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data };
  }
}
