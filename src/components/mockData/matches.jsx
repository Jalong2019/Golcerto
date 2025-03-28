
const mockMatches = [
  {
    id: "101",
    league: "Premier League",
    date: "2025-03-17T15:00:00Z",
    status: "scheduled",
    home_team: {
      name: "Manchester City",
      logo: "https://example.com/logo-city.png"
    },
    away_team: {
      name: "Chelsea",
      logo: "https://example.com/logo-chelsea.png"
    },
    odds: {
      home: 1.85,
      draw: 3.60,
      away: 4.20
    },
    odds_count: 15
  },
  {
    id: "102",
    league: "La Liga",
    date: "2025-03-18T19:30:00Z",
    status: "scheduled",
    home_team: {
      name: "Atletico Madrid",
      logo: "https://example.com/logo-atletico.png"
    },
    away_team: {
      name: "Sevilla",
      logo: "https://example.com/logo-sevilla.png"
    },
    odds: {
      home: 1.65,
      draw: 3.75,
      away: 5.00
    },
    odds_count: 12
  },
  {
    id: "103",
    league: "Serie A",
    date: "2025-03-19T18:45:00Z",
    status: "scheduled",
    home_team: {
      name: "Inter",
      logo: "https://example.com/logo-inter.png"
    },
    away_team: {
      name: "Roma",
      logo: "https://example.com/logo-roma.png"
    },
    odds: {
      home: 2.10,
      draw: 3.30,
      away: 3.50
    },
    odds_count: 18
  },
  {
    id: "104",
    league: "Bundesliga",
    date: "2025-03-20T16:30:00Z",
    status: "scheduled",
    home_team: {
      name: "RB Leipzig",
      logo: "https://example.com/logo-leipzig.png"
    },
    away_team: {
      name: "Eintracht Frankfurt",
      logo: "https://example.com/logo-frankfurt.png"
    },
    odds: {
      home: 1.75,
      draw: 3.80,
      away: 4.50
    },
    odds_count: 10
  },
  {
    id: "105",
    league: "Brasileirão",
    date: "2025-03-21T20:00:00Z",
    status: "scheduled",
    home_team: {
      name: "São Paulo",
      logo: "https://example.com/logo-saopaulo.png"
    },
    away_team: {
      name: "Corinthians",
      logo: "https://example.com/logo-corinthians.png"
    },
    odds: {
      home: 2.20,
      draw: 3.20,
      away: 3.30
    },
    odds_count: 22
  }
];

export default mockMatches;
