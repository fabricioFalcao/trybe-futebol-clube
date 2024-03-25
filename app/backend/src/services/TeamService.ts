import ITeam from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../types/ServiceResponse';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import { SeqTeamDao } from '../daoModels';

export default class TeamService {
  constructor(private model: ITeamModel = new SeqTeamDao()) { }


  public async findAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.model.findAllTeams();
    return { status: 'SUCCESSFUL', data };
  }

  public async findTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const data = await this.model.findTeamById(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data };
  }
}
