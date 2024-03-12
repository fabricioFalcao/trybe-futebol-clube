type MatchNewData = {
  homeTeamGoals: number,
  awayTeamGoals: number
} | {
  inProgress: false
};

type NewMatch = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
};

export {
  MatchNewData,
  NewMatch,
};
