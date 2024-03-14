import SeqTeamModel from '../../database/models/SeqTeamModel';
import SeqMatchModel from '../../database/models/SeqMatchModel';
import IMatch from '../../Interfaces/matches/IMatch';
import { HomeOrAway } from '../../types/HomeOrAway';
import ITeam from '../../Interfaces/teams/ITeam';
import TeamResult from './teamClass/TeamResult';

export default abstract class LeaderBoardService {
  private _homeLeaderBoard: TeamResult[] = [];
  private _awayLeaderBoard: TeamResult[] = [];
  private _matchesList!: IMatch[];
  private _teamsList!: ITeam[];

  constructor(protected teamModel = SeqTeamModel, protected matchModel = SeqMatchModel) {
    this.initialize();
  }

  protected async initialize() {
    this._teamsList = await this.teamsList();
    this._matchesList = await this.matchesList();
  }

  protected abstract teamsList(): Promise<ITeam[]>;

  protected abstract matchesList(): Promise<IMatch[]>;

  private filterMatchesList(teamId: number, homeOrAway: HomeOrAway) {
    const homeOrAwayId = homeOrAway === 'home' ? 'homeTeamId' : 'awayTeamId';

    return this._matchesList.filter((match) => match[homeOrAwayId] === teamId);
  }

  private setLeaderBoard(homeOrAway: HomeOrAway) {
    return this._teamsList
      .map((team) => new TeamResult(
        homeOrAway,
        this.filterMatchesList(team.id, homeOrAway),
        team.teamName,
      )
        .result)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public async partialLeaderBoard(homeOrAway: HomeOrAway) {
    await this.initialize();
    const data = this.setLeaderBoard(homeOrAway);

    if (!data) return { status: 'SERVER_ERROR', data: { message: 'Unable to retrieve data' } };

    return { status: 'SUCCESSFUL', data };
  }
}
