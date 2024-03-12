import ITeam from '../teams/ITeam';

type TeamName = { teamName: ITeam['teamName'] };

export default interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: TeamName,
  awayTeam?: TeamName
}
