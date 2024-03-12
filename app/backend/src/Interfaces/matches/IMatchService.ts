import { Finished } from '../../types/EndpointResponse';
import { ServiceResponse } from '../../types/ServiceResponse';
import IMatch from './IMatch';

export default interface IMatchService {
  findAllMatches(inProgress: boolean | undefined): Promise<ServiceResponse<IMatch[]>>
  finishMatch(matchId: number): Promise<ServiceResponse<Finished>>
}
