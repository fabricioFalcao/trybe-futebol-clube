import { ServiceResponse } from '../../types/ServiceResponse';
import IResult from '../../Interfaces/leaderBoard/IResult';
import IMatch from '../../Interfaces/matches/IMatch';
import { HomeOrAway } from '../../types/HomeOrAway';
import ITeam from '../../Interfaces/teams/ITeam';
import TeamResult from './TeamResult';
import { SeqTeamDao, SeqMatchDao } from '../../daoModels';
import ITeamModel from '../../Interfaces/teams/ITeamModel';
import IMatchModel from '../../Interfaces/matches/IMatchModel';

export default class LeaderBoardService {
  private _homeLeaderBoard: IResult[] = [];
  private _awayLeaderBoard: IResult[] = [];
  private _matchesList!: IMatch[];
  private _teamsList!: ITeam[];

  constructor(
    protected teamModel: ITeamModel = new SeqTeamDao(),
    protected matchModel: IMatchModel = new SeqMatchDao(),
  ) {
    this.initialize();
  }

  protected async initialize() {
    this._teamsList = await this.teamModel.findAllTeams();
    this._matchesList = await this.matchModel.findAllMatches(false);
  }

  private filterMatchesList(teamId: number, homeOrAway: HomeOrAway) {
    const homeOrAwayId = homeOrAway === 'home' ? 'homeTeamId' : 'awayTeamId';

    return this._matchesList.filter((match) => match[homeOrAwayId] === teamId);
  }

  static sortTable(table: IResult[]) {
    return table.sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private setLeaderBoard(homeOrAway: HomeOrAway): IResult[] {
    const leaderBoard = this._teamsList
      .map((team) => new TeamResult(
        homeOrAway,
        this.filterMatchesList(team.id, homeOrAway),
        team.teamName,
      )
        .result);

    return LeaderBoardService.sortTable(leaderBoard);
  }

  private aggregateLeaderBoards() {
    return LeaderBoardService.sortTable(this._homeLeaderBoard.map((homeResult) => {
      const result = this._awayLeaderBoard
        .find((awayResult) => homeResult.name === awayResult.name);

      if (result) {
        result.totalPoints += homeResult.totalPoints;
        result.totalGames += homeResult.totalGames;
        result.totalVictories += homeResult.totalVictories;
        result.totalDraws += homeResult.totalDraws;
        result.totalLosses += homeResult.totalLosses;
        result.goalsFavor += homeResult.goalsFavor;
        result.goalsOwn += homeResult.goalsOwn;
        result.goalsBalance += homeResult.goalsBalance;
        result.efficiency = parseFloat(
          ((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2),
        );
        return result;
      } return homeResult;
    }));
  }

  public async partialLeaderBoard(homeOrAway: HomeOrAway): Promise<ServiceResponse<IResult[]>> {
    await this.initialize();
    const data = this.setLeaderBoard(homeOrAway);

    if (!data) return { status: 'SERVER_ERROR', data: { message: 'Unable to retrieve data' } };

    return { status: 'SUCCESSFUL', data };
  }

  public async leaderBoard(): Promise<ServiceResponse<IResult[]>> {
    await this.initialize();
    this._homeLeaderBoard = this.setLeaderBoard('home');
    this._awayLeaderBoard = this.setLeaderBoard('away');

    const data = this.aggregateLeaderBoards();

    if (!data) return { status: 'SERVER_ERROR', data: { message: 'Unable to retrieve data' } };

    return { status: 'SUCCESSFUL', data };
  }
}
