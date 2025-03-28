import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Flag, ArrowLeft, Shield, BarChart3, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
// Corrigir importação para usar diretamente o serviço
import APIFootballService from "@/components/utils/APIFootballService";

export default function League() {
  const [league, setLeague] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeagueAndFixtures();
  }, []);

  const loadLeagueAndFixtures = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Obter ID da liga e temporada pela URL
      const urlParams = new URLSearchParams(window.location.search);
      const leagueId = urlParams.get('id');
      const season = urlParams.get('season') || new Date().getFullYear();
      
      if (!leagueId) {
        throw new Error('ID da liga não fornecido');
      }
      
      console.log(`📌 Carregando liga ${leagueId} e temporada ${season}`);
      console.log("📌 APIFootballService importado:", APIFootballService);
      console.log("📌 getLeagueById tipo:", typeof APIFootballService.getLeagueById);
      console.log("📌 getFixturesByLeagueId tipo:", typeof APIFootballService.getFixturesByLeagueId);
      
      // Verificar se as funções existem
      if (typeof APIFootballService.getLeagueById !== 'function') {
        throw new Error("Função getLeagueById não encontrada");
      }
      
      if (typeof APIFootballService.getFixturesByLeagueId !== 'function') {
        throw new Error("Função getFixturesByLeagueId não encontrada");
      }
      
      // Carregar informações da liga
      const leagueResponse = await APIFootballService.getLeagueById(leagueId);
      if (!leagueResponse.response || leagueResponse.response.length === 0) {
        throw new Error('Liga não encontrada');
      }
      
      setLeague(leagueResponse.response[0]);
      
      // Carregar jogos da liga
      const fixturesResponse = await APIFootballService.getFixturesByLeagueId(leagueId, season);
      if (fixturesResponse.response) {
        setFixtures(fixturesResponse.response);
      }
    } catch (error) {
      console.error('Erro ao carregar liga:', error);
      setError(error.message);
      
      // Carregar dados de exemplo em caso de erro
      console.log("📌 Usando dados de exemplo");
      
      if (error.message.includes("getFixturesByLeagueId")) {
        // Carregar apenas dados de exemplo da liga e partidas em caso de erro específico
        const urlParams = new URLSearchParams(window.location.search);
        const leagueId = urlParams.get('id') || 1;
        
        // Dados de exemplo baseados no ID da liga
        let exampleLeague = {
          league: {
            id: leagueId,
            name: leagueId == 71 ? "Brasileirão Série A" : 
                  leagueId == 39 ? "Premier League" : 
                  leagueId == 140 ? "La Liga" : "Liga Demo",
            country: leagueId == 71 ? "Brasil" : 
                     leagueId == 39 ? "Inglaterra" : 
                     leagueId == 140 ? "Espanha" : "Mundo",
            logo: "https://media.api-sports.io/football/leagues/1.png",
            flag: "https://media.api-sports.io/flags/br.svg",
            season: new Date().getFullYear()
          }
        };
        
        setLeague(exampleLeague);
        
        // Jogos de exemplo
        setFixtures([
          {
            fixture: {
              id: 1,
              date: "2024-08-10T16:30:00+00:00",
              status: { short: "NS", long: "Not Started", elapsed: null }
            },
            league: { id: leagueId, name: exampleLeague.league.name },
            teams: {
              home: { id: 33, name: leagueId == 71 ? "Flamengo" : "Time Casa 1", logo: "https://media.api-sports.io/football/teams/33.png" },
              away: { id: 34, name: leagueId == 71 ? "Palmeiras" : "Time Fora 1", logo: "https://media.api-sports.io/football/teams/34.png" }
            },
            goals: { home: null, away: null }
          },
          {
            fixture: {
              id: 2,
              date: "2024-08-10T19:00:00+00:00",
              status: { short: "NS", long: "Not Started", elapsed: null }
            },
            league: { id: leagueId, name: exampleLeague.league.name },
            teams: {
              home: { id: 35, name: leagueId == 71 ? "São Paulo" : "Time Casa 2", logo: "https://media.api-sports.io/football/teams/35.png" },
              away: { id: 36, name: leagueId == 71 ? "Corinthians" : "Time Fora 2", logo: "https://media.api-sports.io/football/teams/36.png" }
            },
            goals: { home: null, away: null }
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error && !league) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center text-gray-400">
          <p>{error}</p>
          <Button 
            className="mt-4 bg-green-600 hover:bg-green-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <h1 className="text-2xl font-bold text-white flex items-center">
            {league?.league?.logo && (
              <img 
                src={league.league.logo} 
                alt={league.league.name} 
                className="w-8 h-8 mr-3" 
              />
            )}
            {league?.league?.name || "Liga"}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {league?.league?.flag && (
            <img 
              src={league.league.flag} 
              alt={league.league.country} 
              className="w-6 h-6" 
            />
          )}
          <Badge className="bg-gray-700 text-gray-300">
            {league?.league?.country || "País"}
          </Badge>
          <Badge className="bg-green-700 text-white">
            <Calendar className="w-3 h-3 mr-1" />
            {league?.league?.season || new Date().getFullYear()}
          </Badge>
        </div>
      </div>
      
      {error && (
        <Card className="bg-red-900/20 border-red-800">
          <CardContent className="p-4 text-red-300">
            <p>{error}</p>
            <p className="text-sm mt-2">Exibindo dados de demonstração</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-white flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Jogos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {fixtures.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              Nenhum jogo encontrado para esta liga ou temporada.
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {fixtures.map((fixture) => (
                <div 
                  key={fixture.fixture.id} 
                  className="p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => window.location.href = createPageUrl(`Match?id=${fixture.fixture.id}`)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="bg-transparent text-gray-300">
                      {formatDate(fixture.fixture.date)} - {formatTime(fixture.fixture.date)}
                    </Badge>
                    <Badge variant="outline" className="bg-transparent text-gray-300">
                      {fixture.fixture.status.long}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 flex-1">
                      {fixture.teams.home.logo && (
                        <img 
                          src={fixture.teams.home.logo} 
                          alt={fixture.teams.home.name} 
                          className="w-6 h-6" 
                        />
                      )}
                      <span className="text-white">{fixture.teams.home.name}</span>
                    </div>
                    
                    <div className="px-3 text-center">
                      {fixture.goals.home !== null ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-white">{fixture.goals.home}</span>
                          <span className="text-gray-400">-</span>
                          <span className="text-xl font-bold text-white">{fixture.goals.away}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">vs</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 justify-end flex-1">
                      <span className="text-white">{fixture.teams.away.name}</span>
                      {fixture.teams.away.logo && (
                        <img 
                          src={fixture.teams.away.logo} 
                          alt={fixture.teams.away.name} 
                          className="w-6 h-6" 
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}