import { HomeOrAway, HomeOrAwayGoals } from '../../types/HomeOrAway';
import IMatch from '../../Interfaces/matches/IMatch';

export default class TeamResult {
  private teamGoals!: HomeOrAwayGoals;
  private adversaryGoals!: HomeOrAwayGoals;

  private _result = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  constructor(private homeOrAway: HomeOrAway, private matchesList: IMatch[], private name: string) {
    this.defineHomeOrAway(this.homeOrAway);

    this._result.name = this.name;
    this.totalGames();
    this.totalVictories();
    this.totalDraws();
    this.totalLosses();
    this.goalsFavor();
    this.goalsOwn();
    this.totalPoints();
    this.goalsBalance();
    this.efficiency();
  }

  private defineHomeOrAway(homeOrAway: HomeOrAway) {
    switch (homeOrAway) {
      case 'home':
        this.teamGoals = 'homeTeamGoals';
        this.adversaryGoals = 'awayTeamGoals';
        break;
      default:
        this.teamGoals = 'awayTeamGoals';
        this.adversaryGoals = 'homeTeamGoals';
    }
  }

  private totalGames() {
    this._result.totalGames = this.matchesList.length;
  }

  private totalVictories() {
    this._result.totalVictories = this.matchesList
      .filter((match) => match[this.teamGoals] > match[this.adversaryGoals]).length;
  }

  private totalDraws() {
    this._result.totalDraws = this.matchesList
      .filter((match) => match[this.teamGoals] === match[this.adversaryGoals]).length;
  }

  private totalLosses() {
    this._result.totalLosses = this.matchesList
      .filter((match) => match[this.teamGoals] < match[this.adversaryGoals]).length;
  }

  private goalsFavor() {
    this._result.goalsFavor = this.matchesList
      .reduce((goals, match) => goals + match[this.teamGoals], 0);
  }

  private goalsOwn() {
    this._result.goalsOwn = this.matchesList
      .reduce((goals, match) => goals + match[this.adversaryGoals], 0);
  }

  private totalPoints() {
    this._result.totalPoints = 3 * this._result.totalVictories + this._result.totalDraws;
  }

  private goalsBalance() {
    this._result.goalsBalance = this._result.goalsFavor - this._result.goalsOwn;
  }

  private efficiency() {
    this._result.efficiency = parseFloat(
      ((this._result.totalPoints / (this._result.totalGames * 3)) * 100).toFixed(2),
    );
  }

  get result() {
    return this._result;
  }
}
