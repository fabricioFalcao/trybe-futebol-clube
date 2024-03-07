import { ServiceResponse } from '../../types/ServiceResponse';
import ITeam from './ITeam';

export default interface ITeamsService {
  findAllTeams(): Promise<ServiceResponse<ITeam[]>>,
  findTeamById(id: ITeam['id']): Promise<ServiceResponse<ITeam>>,
}
