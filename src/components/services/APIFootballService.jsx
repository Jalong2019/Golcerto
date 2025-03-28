import { Configuracao } from "@/api/entities";

/**
 * API Football - Serviço para integração com a API de futebol
 */
const APIFootballService = {
  /**
   * Realiza uma requisição para a API
   */
  async makeRequest(endpoint, params = {}) {
    try {
      const configs = await Configuracao.list();
      if (!configs?.length || !configs[0].api_football_key) {
        throw new Error('API Football key not configured');
      }

      const baseUrl = 'https://v3.football.api-sports.io';
      const queryString = new URLSearchParams(params).toString();
      const url = `${baseUrl}/${endpoint}${queryString ? `?${queryString}` : ''}`;

      console.log(`📡 APIFootballService: Request to ${endpoint}`, params);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-apisports-key': configs[0].api_football_key
        }
      });

      if (!response.ok) {
        throw new Error(`API HTTP error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ APIFootballService error on ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * Obtém jogos ao vivo
   */
  async getLiveFixtures() {
    console.log("🏆 APIFootballService: Getting live fixtures");
    const data = await this.makeRequest("fixtures", { live: "all" });
    return data.response || [];
  },

  /**
   * Obtém odds de um jogo
   */
  async getOdds(fixtureId) {
    const data = await this.makeRequest("odds", { fixture: fixtureId });
    return data.response || [];
  },

  /**
   * Obtém ligas organizadas por país
   */
  async getLeaguesByCountry() {
    console.log("🌍 APIFootballService: Getting leagues by country");
    const data = await this.makeRequest("leagues", { current: true });

    if (!data.response) {
      throw new Error("No leagues returned");
    }

    const FEATURED_LEAGUES = [2, 71, 39, 140, 78, 135, 61, 13, 77];
    const grouped = {};
    
    data.response.forEach(item => {
      const countryName = item.country.name;

      if (!grouped[countryName]) {
        grouped[countryName] = {
          country_id: item.country.id,
          country_name: countryName,
          country_code: item.country.code,
          flag: item.country.flag,
          leagues: []
        };
      }

      const league = {
        id: item.league.id,
        name: item.league.name,
        type: item.league.type,
        logo: item.league.logo,
        season: item.seasons.find(s => s.current)?.year || new Date().getFullYear(),
        isFeatured: FEATURED_LEAGUES.includes(item.league.id)
      };

      const exists = grouped[countryName].leagues.find(l => l.id === league.id);
      if (!exists) {
        grouped[countryName].leagues.push(league);
      }
    });

    console.log(`✅ APIFootballService: Processed ${Object.keys(grouped).length} countries`);
    return grouped;
  },

  /**
   * Obtém status da API
   */
  async getApiStatus() {
    const data = await this.makeRequest("status");
    return data.response || {};
  },

  /**
   * Obtém jogos de uma liga e temporada
   */
  async getFixturesByLeagueId(leagueId, season = new Date().getFullYear()) {
    const data = await this.makeRequest("fixtures", {
      league: leagueId,
      season: season
    });
    return data.response || [];
  },

  /**
   * Obtém detalhes de um jogo por ID
   */
  async getFixtureById(id) {
    const data = await this.makeRequest("fixtures", { id });
    return data.response?.[0] || null;
  },

  /**
   * Obtém estatísticas de uma partida
   */
  async getFixtureStatistics(fixtureId) {
    const data = await this.makeRequest("fixtures/statistics", { fixture: fixtureId });
    return data.response || [];
  },

  /**
   * Obtém equipe por ID
   */
  async getTeamById(teamId) {
    const data = await this.makeRequest("teams", { id: teamId });
    return data.response?.[0] || null;
  },

  /**
   * Obtém times de uma liga
   */
  async getTeamsByLeague(leagueId) {
    const data = await this.makeRequest("teams", { league: leagueId });
    return data.response || [];
  }
};

export default APIFootballService;