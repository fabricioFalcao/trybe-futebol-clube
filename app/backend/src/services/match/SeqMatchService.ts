import { MatchNewData } from '../../types/UpdateData';
import IMatch from '../../Interfaces/matches/IMatch';
import SeqTeamModel from '../../database/models/SeqTeamModel';
import SeqMatchModel from '../../database/models/SeqMatchModel';
import MatchService from './MatchService';

export default class SeqMatchService extends MatchService {
  constructor() {
    super(SeqMatchModel);
  }

  protected async matchesList(inProgress: boolean | undefined): Promise<IMatch[]> {
    const whereCondition = inProgress !== undefined ? { inProgress } : undefined;

    const data = await this.model.findAll({
      where: whereCondition,
      include: [
        { model: SeqTeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SeqTeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data.map((match) => match.dataValues);
  }

  protected async updatedMatch(matchId: number, matchNewData: MatchNewData = { inProgress: false })
    : Promise<boolean> {
    const [updatedRows] = await this.model.update(matchNewData, { where: { id: matchId } });

    return updatedRows !== 0;
  }
}
