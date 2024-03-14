import SeqMatchModel from '../../database/models/SeqMatchModel';
import SeqTeamModel from '../../database/models/SeqTeamModel';
import LeaderBoardService from './LeaderBoardService';
import ITeam from '../../Interfaces/teams/ITeam';

export default class SeqLeaderBoardService extends LeaderBoardService {
  constructor() {
    super(SeqTeamModel, SeqMatchModel);
  }

  protected async teamsList(): Promise<ITeam[]> {
    const data = await this.teamModel.findAll();
    return data.map((team) => team.dataValues);
  }

  protected async matchesList() {
    const data = await this.matchModel.findAll({ where: { inProgress: false } });
    return data.map((match) => match.dataValues);
  }
}
