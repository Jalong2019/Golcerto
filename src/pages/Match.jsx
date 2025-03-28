import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  TrendingUp,
  Loader,
  ArrowLeft,
  Info
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import APIFootballClient from "@/components/utils/APIFootballService";

export default function Match() {
  const [match, setMatch] = useState(null);
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMatchData();
  }, []);

  const loadMatchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Obter ID da partida pela URL
      const urlParams = new URLSearchParams(window.location.search);
      const matchId = urlParams.get('id');
      
      if (!matchId) {
        throw new Error('ID da partida não fornecido');
      }
      
      // Carregar dados da partida
      const matchResponse = await APIFootballClient.getFixtureById(matchId);
      if (!matchResponse.response || matchResponse.response.length === 0) {
        throw new Error('Partida não encontrada');
      }
      
      setMatch(matchResponse.response[0]);
      
      // Carregar odds da partida
      try {
        const oddsResponse = await APIFootballClient.getOdds(matchId);
        if (oddsResponse.response && oddsResponse.response.length > 0) {
          setOdds(oddsResponse.response);
        }
      } catch (oddsError) {
        console.error('Erro ao carregar odds:', oddsError);
        // Não falhar completamente se apenas as odds falharem
      }
    } catch (error) {
      console.error('Erro ao carregar dados da partida:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatMatchDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  const formatMatchTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "HH:mm");
    } catch (e) {
      return "";
    }
  };

  const getMainOdds = () => {
    if (!odds || odds.length === 0) {
      return { home: 0, draw: 0, away: 0 };
    }
    
    // Procurar odds de Match Winner (1X2)
    const matchWinnerOdds = odds.find(odd => {
      return odd.bookmakers && odd.bookmakers[0]?.bets?.some(bet => bet.name === "Match Winner");
    });
    
    if (!matchWinnerOdds || !matchWinnerOdds.bookmakers || matchWinnerOdds.bookmakers.length === 0) {
      return { home: 0, draw: 0, away: 0 };
    }
    
    const bet = matchWinnerOdds.bookmakers[0].bets.find(b => b.name === "Match Winner");
    if (!bet || !bet.values) {
      return { home: 0, draw: 0, away: 0 };
    }
    
    const homeOdd = bet.values.find(v => v.value === "Home")?.odd || 0;
    const drawOdd = bet.values.find(v => v.value === "Draw")?.odd || 0;
    const awayOdd = bet.values.find(v => v.value === "Away")?.odd || 0;
    
    return { home: homeOdd, draw: drawOdd, away: awayOdd };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center text-gray-400">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!match) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center text-gray-400">
          Jogo não encontrado ou indisponível.
        </CardContent>
      </Card>
    );
  }

  const mainOdds = getMainOdds();

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>{match.league.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-700">
              {match.league.name}
            </Badge>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-white">
                {formatMatchDate(match.fixture.date)} às {formatMatchTime(match.fixture.date)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 items-center">
            <div className="col-span-3 text-right">
              <img 
                src={match.teams.home.logo} 
                alt={match.teams.home.name}
                className="h-12 inline-block mb-2"
              />
              <h2 className="text-xl font-bold text-white">{match.teams.home.name}</h2>
            </div>
            
            <div className="col-span-1 text-center">
              <div className="text-2xl font-bold text-white">
                {match.goals?.home ?? 0} - {match.goals?.away ?? 0}
              </div>
            </div>
            
            <div className="col-span-3">
              <img 
                src={match.teams.away.logo} 
                alt={match.teams.away.name}
                className="h-12 inline-block mb-2"
              />
              <h2 className="text-xl font-bold text-white">{match.teams.away.name}</h2>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-white">Odds:</h3>
            <p className="text-white">Casa: {mainOdds.home}, Empate: {mainOdds.draw}, Fora: {mainOdds.away}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="principal" className="space-y-4">
        <TabsList className="w-full justify-start bg-gray-800 p-0 h-12">
          <TabsTrigger value="principal">Principal</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          <TabsTrigger value="gols">Gols</TabsTrigger>
        </TabsList>

        <TabsContent value="principal">
          {/* Conteúdo da aba Principal */}
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => {/* Implementar lógica de criar aposta */}}
        >
          <Info className="w-5 h-5 mr-2" />
          Criar Aposta Personalizada
        </Button>
      </div>
    </div>
  );
}