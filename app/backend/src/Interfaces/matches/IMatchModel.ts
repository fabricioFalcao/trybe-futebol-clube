import { MatchNewData, NewMatch } from '../../types/InsertData';
import IMatch from './IMatch';

export default interface IMatchModel {
  // findAllMatches shall handle both cases when matches are filtered according to inProgress status or not filtered at all
  findAllMatches(inProgress: boolean | undefined): Promise<IMatch[]>

  // updateMatch shall handle both finish and update matches feature
  updateMatch(matchId: number, matchNewData?: MatchNewData): Promise<boolean>

  createMatch(newMatch: NewMatch): Promise<IMatch>
}
