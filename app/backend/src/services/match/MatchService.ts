import { MatchNewData, NewMatch } from '../../types/InsertData';
import { Finished, Updated } from '../../types/EndpointResponse';
import { ServiceResponse } from '../../types/ServiceResponse';
import IMatch from '../../Interfaces/matches/IMatch';
import IMatchService from '../../Interfaces/matches/IMatchService';
import SeqMatchModel from '../../database/models/SeqMatchModel';

export default abstract class MatchService implements IMatchService {
  constructor(protected model = SeqMatchModel) { }

  // matchesList shall handle both cases when matches are filtered according to inProgress status or not filtered at all
  protected abstract matchesList(inProgress: boolean | undefined): Promise<IMatch[]>;

  // updatedMatch shall handle both finish and update matches feature
  protected abstract updatedMatch(matchId: number, matchNewData?: MatchNewData): Promise<boolean>;

  protected abstract createdMatch(newMatch: NewMatch): Promise<IMatch>;

  public async findAllMatches(inProgress: boolean | undefined): Promise<ServiceResponse<IMatch[]>> {
    const data = await this.matchesList(inProgress);
    return { status: 'SUCCESSFUL', data };
  }

  public async finishMatch(matchId: number): Promise<ServiceResponse<Finished>> {
    const updatedRows = await this.updatedMatch(matchId);

    if (!updatedRows) return { status: 'SERVER_ERROR', data: { message: 'Unable to finish it' } };

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(matchId: number, matchNewData: MatchNewData)
    : Promise<ServiceResponse<Updated>> {
    const updatedRows = await this.updatedMatch(matchId, matchNewData);

    if (!updatedRows) return { status: 'SERVER_ERROR', data: { message: 'Unable to update it' } };

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(newMatch: NewMatch): Promise<ServiceResponse<IMatch>> {
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return {
        status: 'INVALID_VALUE',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    try {
      const match = await this.createdMatch(newMatch);
      return { status: 'CREATED', data: match };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
  }
}
