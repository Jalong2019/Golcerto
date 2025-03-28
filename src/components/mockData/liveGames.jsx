
const mockLiveGames = [
  {
    id: "1",
    league: "Premier League",
    country: "Inglaterra",
    homeTeam: "Liverpool",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    minute: "75",
    homeOdds: 1.65,
    drawOdds: 3.50,
    awayOdds: 5.20,
    isPopular: true,
    stats: {
      possession: {
        home: 58,
        away: 42
      },
      shots: {
        home: 15,
        away: 9
      },
      shotsOnTarget: {
        home: 7,
        away: 3
      },
      corners: {
        home: 7,
        away: 3
      }
    },
    events: [
      {
        type: "goal",
        minute: "23",
        team: "home",
        player: "Salah"
      },
      {
        type: "goal",
        minute: "41",
        team: "away",
        player: "Saka"
      },
      {
        type: "yellow_card",
        minute: "57",
        team: "away",
        player: "Partey"
      },
      {
        type: "goal",
        minute: "67",
        team: "home",
        player: "Diaz"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "Liverpool", odds: 1.65 },
          { name: "Empate", odds: 3.50 },
          { name: "Arsenal", odds: 5.20 }
        ]
      },
      {
        name: "Próximo Gol",
        options: [
          { name: "Liverpool", odds: 1.80 },
          { name: "Nenhum", odds: 2.60 },
          { name: "Arsenal", odds: 3.75 }
        ]
      }
    ]
  },
  {
    id: "2",
    league: "La Liga",
    country: "Espanha",
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeScore: 1,
    awayScore: 1,
    minute: "62",
    homeOdds: 2.10,
    drawOdds: 3.25,
    awayOdds: 3.40,
    isPopular: true,
    stats: {
      possession: {
        home: 63,
        away: 37
      },
      shots: {
        home: 12,
        away: 8
      },
      shotsOnTarget: {
        home: 5,
        away: 4
      },
      corners: {
        home: 6,
        away: 2
      }
    },
    events: [
      {
        type: "goal",
        minute: "17",
        team: "home",
        player: "Lewandowski"
      },
      {
        type: "goal",
        minute: "34",
        team: "away",
        player: "Vinicius Jr"
      },
      {
        type: "yellow_card",
        minute: "42",
        team: "home",
        player: "Busquets"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "Barcelona", odds: 2.10 },
          { name: "Empate", odds: 3.25 },
          { name: "Real Madrid", odds: 3.40 }
        ]
      },
      {
        name: "Ambas Equipes Marcam",
        options: [
          { name: "Sim", odds: 1.36 },
          { name: "Não", odds: 3.00 }
        ]
      }
    ]
  },
  {
    id: "3",
    league: "Serie A",
    country: "Itália",
    homeTeam: "Juventus",
    awayTeam: "Milan",
    homeScore: 0,
    awayScore: 2,
    minute: "83",
    homeOdds: 8.50,
    drawOdds: 4.75,
    awayOdds: 1.35,
    isPopular: false,
    stats: {
      possession: {
        home: 47,
        away: 53
      },
      shots: {
        home: 7,
        away: 14
      },
      shotsOnTarget: {
        home: 2,
        away: 6
      },
      corners: {
        home: 3,
        away: 8
      }
    },
    events: [
      {
        type: "goal",
        minute: "29",
        team: "away",
        player: "Leão"
      },
      {
        type: "red_card",
        minute: "54",
        team: "home",
        player: "Bonucci"
      },
      {
        type: "goal",
        minute: "71",
        team: "away",
        player: "Giroud"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "Juventus", odds: 8.50 },
          { name: "Empate", odds: 4.75 },
          { name: "Milan", odds: 1.35 }
        ]
      },
      {
        name: "Total de Gols",
        options: [
          { name: "Mais de 2.5", odds: 1.45 },
          { name: "Menos de 2.5", odds: 2.75 }
        ]
      }
    ]
  },
  {
    id: "4",
    league: "Brasileirão",
    country: "Brasil",
    homeTeam: "Flamengo",
    awayTeam: "Palmeiras",
    homeScore: 3,
    awayScore: 2,
    minute: "88",
    homeOdds: 1.20,
    drawOdds: 6.50,
    awayOdds: 12.00,
    isPopular: true,
    stats: {
      possession: {
        home: 55,
        away: 45
      },
      shots: {
        home: 18,
        away: 11
      },
      shotsOnTarget: {
        home: 8,
        away: 4
      },
      corners: {
        home: 9,
        away: 5
      }
    },
    events: [
      {
        type: "goal",
        minute: "12",
        team: "home",
        player: "Gabigol"
      },
      {
        type: "goal",
        minute: "24",
        team: "away",
        player: "Dudu"
      },
      {
        type: "goal",
        minute: "56",
        team: "home",
        player: "Pedro"
      },
      {
        type: "goal",
        minute: "69",
        team: "away",
        player: "Rony"
      },
      {
        type: "goal",
        minute: "81",
        team: "home",
        player: "Arrascaeta"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "Flamengo", odds: 1.20 },
          { name: "Empate", odds: 6.50 },
          { name: "Palmeiras", odds: 12.00 }
        ]
      },
      {
        name: "Mais Cartões",
        options: [
          { name: "Flamengo", odds: 2.10 },
          { name: "Igual", odds: 3.25 },
          { name: "Palmeiras", odds: 2.20 }
        ]
      }
    ]
  },
  {
    id: "5",
    league: "Ligue 1",
    country: "França",
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeScore: 2,
    awayScore: 0,
    minute: "35",
    homeOdds: 1.30,
    drawOdds: 5.50,
    awayOdds: 8.25,
    isPopular: false,
    stats: {
      possession: {
        home: 68,
        away: 32
      },
      shots: {
        home: 9,
        away: 3
      },
      shotsOnTarget: {
        home: 4,
        away: 1
      },
      corners: {
        home: 5,
        away: 1
      }
    },
    events: [
      {
        type: "goal",
        minute: "11",
        team: "home",
        player: "Mbappé"
      },
      {
        type: "yellow_card",
        minute: "23",
        team: "away",
        player: "Guendouzi"
      },
      {
        type: "goal",
        minute: "29",
        team: "home",
        player: "Neymar"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "PSG", odds: 1.30 },
          { name: "Empate", odds: 5.50 },
          { name: "Marseille", odds: 8.25 }
        ]
      },
      {
        name: "Handicap Asiático",
        options: [
          { name: "PSG -1.5", odds: 1.95 },
          { name: "Marseille +1.5", odds: 1.85 }
        ]
      }
    ]
  },
  {
    id: "6",
    league: "Bundesliga",
    country: "Alemanha",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: 2,
    awayScore: 2,
    minute: "71",
    homeOdds: 1.95,
    drawOdds: 3.60,
    awayOdds: 3.80,
    isPopular: true,
    stats: {
      possession: {
        home: 60,
        away: 40
      },
      shots: {
        home: 17,
        away: 10
      },
      shotsOnTarget: {
        home: 7,
        away: 5
      },
      corners: {
        home: 8,
        away: 3
      }
    },
    events: [
      {
        type: "goal",
        minute: "8",
        team: "home",
        player: "Musiala"
      },
      {
        type: "goal",
        minute: "27",
        team: "away",
        player: "Haaland"
      },
      {
        type: "goal",
        minute: "42",
        team: "home",
        player: "Gnabry"
      },
      {
        type: "goal",
        minute: "58",
        team: "away",
        player: "Reus"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "Bayern", odds: 1.95 },
          { name: "Empate", odds: 3.60 },
          { name: "Dortmund", odds: 3.80 }
        ]
      },
      {
        name: "Próximo Gol",
        options: [
          { name: "Bayern", odds: 1.70 },
          { name: "Nenhum", odds: 3.50 },
          { name: "Dortmund", odds: 3.25 }
        ]
      }
    ]
  },
  {
    id: "7",
    league: "Copa Libertadores",
    country: "América do Sul",
    homeTeam: "River Plate",
    awayTeam: "Boca Juniors",
    homeScore: 1,
    awayScore: 0,
    minute: "55",
    homeOdds: 1.80,
    drawOdds: 3.25,
    awayOdds: 4.50,
    isPopular: true,
    stats: {
      possession: {
        home: 52,
        away: 48
      },
      shots: {
        home: 10,
        away: 8
      },
      shotsOnTarget: {
        home: 4,
        away: 2
      },
      corners: {
        home: 5,
        away: 4
      }
    },
    events: [
      {
        type: "yellow_card",
        minute: "14",
        team: "away",
        player: "Izquierdoz"
      },
      {
        type: "goal",
        minute: "38",
        team: "home",
        player: "Borré"
      },
      {
        type: "yellow_card",
        minute: "47",
        team: "home",
        player: "Enzo Pérez"
      }
    ],
    markets: [
      {
        name: "Resultado Final",
        options: [
          { name: "River", odds: 1.80 },
          { name: "Empate", odds: 3.25 },
          { name: "Boca", odds: 4.50 }
        ]
      },
      {
        name: "Ambas Equipes Marcam",
        options: [
          { name: "Sim", odds: 2.10 },
          { name: "Não", odds: 1.70 }
        ]
      }
    ]
  }
];

export default mockLiveGames;
