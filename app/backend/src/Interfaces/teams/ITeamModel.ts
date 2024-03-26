import ITeam from './ITeam';

export default interface ITeamModel {
  findAllTeams(): Promise<ITeam[]>,
  findTeamById(id: ITeam['id']): Promise<ITeam | null>,
}
