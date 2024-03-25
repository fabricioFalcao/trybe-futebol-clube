import { MatchNewData, NewMatch } from '../types/InsertData';
import { Finished, Updated } from '../types/EndpointResponse';
import { ServiceResponse } from '../types/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import { SeqMatchDao } from '../daoModels';

export default class MatchService {
  constructor(private model: IMatchModel = new SeqMatchDao()) { }

  public async findAllMatches(inProgress: boolean | undefined): Promise<ServiceResponse<IMatch[]>> {
    const data = await this.model.findAllMatches(inProgress);
    return { status: 'SUCCESSFUL', data };
  }

  public async finishMatch(matchId: number): Promise<ServiceResponse<Finished>> {
    const updatedRows = await this.model.updateMatch(matchId);

    if (!updatedRows) return { status: 'SERVER_ERROR', data: { message: 'Unable to finish it' } };

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(matchId: number, matchNewData: MatchNewData)
    : Promise<ServiceResponse<Updated>> {
    const updatedRows = await this.model.updateMatch(matchId, matchNewData);

    if (!updatedRows) return { status: 'SERVER_ERROR', data: { message: 'Unable to update it' } };

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(newMatch: Omit<NewMatch, 'inProgress'>)
    : Promise<ServiceResponse<IMatch>> {
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return {
        status: 'INVALID_VALUE',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    try {
      const inputData = { ...newMatch, inProgress: true };
      const match = await this.model.createMatch(inputData);
      return { status: 'CREATED', data: match };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
  }
}
