
const mockMatchDetail = {
  id: "301",
  league: {
    name: "Premier League",
    country: "Inglaterra",
    logo: "https://example.com/logo-premier.png"
  },
  date: "2025-05-10T15:00:00Z",
  status: "scheduled",
  time: "15:00",
  stadium: "Etihad Stadium",
  referee: "Michael Oliver",
  home_team: {
    id: "city",
    name: "Manchester City",
    logo: "https://example.com/logo-city.png",
    form: "WWDWW"
  },
  away_team: {
    id: "liverpool",
    name: "Liverpool",
    logo: "https://example.com/logo-liverpool.png",
    form: "WDWLW"
  },
  score: {
    home: 0,
    away: 0
  },
  statistics: {
    possession: {
      home: 0,
      away: 0
    },
    shots: {
      home: 0,
      away: 0
    },
    shots_on_target: {
      home: 0,
      away: 0
    },
    corners: {
      home: 0,
      away: 0
    }
  },
  lineups: {
    home: [
      { name: "Ederson", position: "GK", number: 31 },
      { name: "Walker", position: "DF", number: 2 },
      { name: "Dias", position: "DF", number: 3 },
      { name: "Laporte", position: "DF", number: 14 },
      { name: "Cancelo", position: "DF", number: 27 },
      { name: "Rodri", position: "MF", number: 16 },
      { name: "De Bruyne", position: "MF", number: 17 },
      { name: "Bernardo Silva", position: "MF", number: 20 },
      { name: "Mahrez", position: "FW", number: 26 },
      { name: "Sterling", position: "FW", number: 7 },
      { name: "Haaland", position: "FW", number: 9 }
    ],
    away: [
      { name: "Alisson", position: "GK", number: 1 },
      { name: "Alexander-Arnold", position: "DF", number: 66 },
      { name: "Van Dijk", position: "DF", number: 4 },
      { name: "Matip", position: "DF", number: 32 },
      { name: "Robertson", position: "DF", number: 26 },
      { name: "Fabinho", position: "MF", number: 3 },
      { name: "Henderson", position: "MF", number: 14 },
      { name: "Thiago", position: "MF", number: 6 },
      { name: "Salah", position: "FW", number: 11 },
      { name: "Mané", position: "FW", number: 10 },
      { name: "Diaz", position: "FW", number: 23 }
    ]
  },
  markets: [
    {
      id: "1",
      name: "Resultado Final",
      options: [
        { id: "1_1", name: "Manchester City", odds: 2.10 },
        { id: "1_X", name: "Empate", odds: 3.40 },
        { id: "1_2", name: "Liverpool", odds: 3.20 }
      ]
    },
    {
      id: "2",
      name: "Ambas Equipes Marcam",
      options: [
        { id: "2_Y", name: "Sim", odds: 1.65 },
        { id: "2_N", name: "Não", odds: 2.10 }
      ]
    },
    {
      id: "3",
      name: "Total de Gols",
      options: [
        { id: "3_O25", name: "Mais de 2.5", odds: 1.80 },
        { id: "3_U25", name: "Menos de 2.5", odds: 2.05 }
      ]
    },
    {
      id: "4",
      name: "Resultado Exato",
      options: [
        { id: "4_10", name: "1-0", odds: 8.00 },
        { id: "4_20", name: "2-0", odds: 9.50 },
        { id: "4_21", name: "2-1", odds: 8.50 },
        { id: "4_01", name: "0-1", odds: 10.00 },
        { id: "4_02", name: "0-2", odds: 15.00 },
        { id: "4_12", name: "1-2", odds: 11.00 },
        { id: "4_00", name: "0-0", odds: 12.00 },
        { id: "4_11", name: "1-1", odds: 6.50 },
        { id: "4_22", name: "2-2", odds: 14.00 }
      ]
    },
    {
      id: "5",
      name: "Handicap Asiático",
      options: [
        { id: "5_M05", name: "Manchester City -0.5", odds: 1.90 },
        { id: "5_L05", name: "Liverpool +0.5", odds: 1.90 }
      ]
    },
    {
      id: "6",
      name: "Primeiro a Marcar",
      options: [
        { id: "6_M", name: "Manchester City", odds: 1.85 },
        { id: "6_N", name: "Nenhum", odds: 9.00 },
        { id: "6_L", name: "Liverpool", odds: 2.10 }
      ]
    }
  ],
  events: [],
  head_to_head: [
    {
      date: "2024-11-25",
      home_team: "Liverpool",
      away_team: "Manchester City",
      score: "2-2",
      league: "Premier League"
    },
    {
      date: "2024-04-10",
      home_team: "Manchester City",
      away_team: "Liverpool",
      score: "2-1",
      league: "Premier League"
    },
    {
      date: "2023-10-15",
      home_team: "Liverpool",
      away_team: "Manchester City",
      score: "1-0",
      league: "Premier League"
    }
  ]
};

export default mockMatchDetail;
