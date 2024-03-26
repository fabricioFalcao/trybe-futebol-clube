import IMatch from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import SeqMatchModel from '../database/models/SeqMatchModel';
import SeqTeamModel from '../database/models/SeqTeamModel';
import { MatchNewData, NewMatch } from '../types/InsertData';

export default class SeqMatchDao implements IMatchModel {
  private model = SeqMatchModel;

  async findAllMatches(inProgress: boolean | undefined): Promise<IMatch[]> {
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

  async updateMatch(matchId: number, matchNewData: MatchNewData = { inProgress: false })
    : Promise<boolean> {
    const [updatedRows] = await this.model.update(matchNewData, { where: { id: matchId } });

    return updatedRows !== 0;
  }

  async createMatch(newMatch: NewMatch): Promise<IMatch> {
    return this.model.create(newMatch);
  }
}
