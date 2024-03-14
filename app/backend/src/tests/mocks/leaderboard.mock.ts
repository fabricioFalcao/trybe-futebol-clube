const mockedMatches = [
  // First match
  {
    id: 1,
    homeTeamId: 1, // Pitty F.C.
    homeTeamGoals: 5,
    awayTeamId: 2, // Time da peladinha do lote
    awayTeamGoals: 1,
    inProgress: false
  },
  // Second match
  {
    id: 2,
    homeTeamId: 2, // Time da peladinha do lote
    homeTeamGoals: 2,
    awayTeamId: 3, // Florestal F.C.
    awayTeamGoals: 2,
    inProgress: false
  },
  // Third match
  {
    id: 3,
    homeTeamId: 3, // Florestal F.C.
    homeTeamGoals: 0,
    awayTeamId: 1, // Pitty F.C.
    awayTeamGoals: 4,
    inProgress: false
  },
];

const mockedResults = [
  {
    name: "Pitty F.C.",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 1,
    goalsBalance: 8,
    efficiency: 100
  },
  {
    name: "Time da peladinha do lote",
    totalPoints: 1,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 3,
    goalsOwn: 7,
    goalsBalance: -4,
    efficiency: 16.67
  },
  {
    name: "Florestal F.C.",
    totalPoints: 1,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 2,
    goalsOwn: 6,
    goalsBalance: -4,
    efficiency: 16.67
  }
];



export {
  mockedMatches,
  mockedResults
}
