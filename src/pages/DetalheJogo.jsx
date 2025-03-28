
import React, { useState, useEffect } from 'react';
import { InvokeLLM } from "@/api/integrations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Timer,
  ChevronLeft,
  Star,
  Clock,
  Trophy,
  AlignJustify,
  BarChart3,
  Radio,
  PieChart,
  TrendingUp,
  Plus,
  Minus,
  X
} from "lucide-react";
import { calcularMargem } from "../components/utils/gerenciadorRisco";
import { mockMatchDetail } from "../components/mockData/matchDetail";
import APIFootballService from "@/components/utils/APIFootballService";

export default function DetalheJogo() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betValue, setBetValue] = useState('10');
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [activeTab, setActiveTab] = useState("principais");
  const navigate = useNavigate();

  useEffect(() => {
    loadMatchDetails();
  }, []);

  const loadMatchDetails = async () => {
    setLoading(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const matchId = urlParams.get('id');

      if (!matchId) {
        throw new Error('ID do jogo não fornecido');
      }

      setTimeout(() => {
        const matchData = { ...mockMatchDetail, id: matchId };
        setMatch(matchData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar detalhes do jogo:", error);
      navigate(createPageUrl("Home"));
      setLoading(false);
    }
  };

  const handleAddSelection = (market, outcome) => {
    const existingIndex = selectedMarkets.findIndex(item => item.marketId === market.id);

    if (existingIndex >= 0) {
      const newSelections = [...selectedMarkets];
      newSelections[existingIndex] = {
        marketId: market.id,
        marketName: market.name,
        outcomeId: outcome.id,
        outcomeName: outcome.name,
        odds: outcome.odds
      };
      setSelectedMarkets(newSelections);
    } else {
      setSelectedMarkets([
        ...selectedMarkets,
        {
          marketId: market.id,
          marketName: market.name,
          outcomeId: outcome.id,
          outcomeName: outcome.name,
          odds: outcome.odds
        }
      ]);
    }
  };

  const handleRemoveSelection = (marketId) => {
    setSelectedMarkets(selectedMarkets.filter(item => item.marketId !== marketId));
  };

  const calculateTotalOdds = () => {
    if (selectedMarkets.length === 0) return 0;

    return selectedMarkets.reduce((total, market) => total * market.odds, 1);
  };

  const calculatePotentialWin = () => {
    const value = parseFloat(betValue) || 0;
    return (value * calculateTotalOdds()).toFixed(2);
  };

  const validarAposta = (aposta, mercado, config) => {
    if (aposta.valor > config.limite_aposta_individual) {
      return {
        valida: false,
        mensagem: "Valor máximo de aposta excedido para este mercado.",
        valor_sugerido: config.limite_aposta_individual
      };
    }

    if (mercado.status === 'bloqueado') {
      return {
        valida: false,
        mensagem: "Este mercado está bloqueado para novas apostas devido ao alto risco.",
        valor_sugerido: null
      };
    }

    if (mercado.status === 'limitado') {
      const limiteReduzido = config.limite_aposta_individual * 0.5;
      if (aposta.valor > limiteReduzido) {
        return {
          valida: false,
          mensagem: "Este mercado está com exposição elevada. Valor máximo reduzido.",
          valor_sugerido: limiteReduzido
        };
      }
    }

    return { valida: true };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!match) {
    return (
      <Alert className="bg-red-800 border-red-900 text-white">
        <AlertDescription>
          Erro ao carregar os detalhes do jogo. Tente novamente.
        </AlertDescription>
      </Alert>
    );
  }

  const isLive = match.status === 'live';
  const getBadgeByMarket = (marketName) => {
    if (marketName.includes('Resultado')) return "bg-blue-100 text-blue-800";
    if (marketName.includes('Gols')) return "bg-green-100 text-green-800";
    if (marketName.includes('Cartões')) return "bg-yellow-100 text-yellow-800";
    if (marketName.includes('Escanteios')) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="text-white bg-transparent hover:bg-gray-800 mr-4"
          onClick={() => navigate(createPageUrl("Home"))}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-white">Detalhes do Jogo</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#2A2C2E] border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img 
                    src={match.league.logo || "https://via.placeholder.com/30"} 
                    alt={match.league.name}
                    className="w-6 h-6 object-contain mr-2"
                  />
                  <span className="text-white">{match.league.name} - {match.league.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isLive ? (
                    <Badge className="bg-red-500 text-white">
                      <Radio className="w-3 h-3 mr-1 animate-pulse" />
                      Ao Vivo
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-700 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(match.date).toLocaleDateString('pt-BR')} - {match.time}
                    </Badge>
                  )}
                  <Button variant="ghost" className="text-white bg-transparent hover:bg-gray-800 p-1">
                    <Star className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-6">
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="flex flex-col items-center text-center w-5/12">
                    <img 
                      src={match.home_team.logo || "https://via.placeholder.com/64"} 
                      alt={match.home_team.name}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <h3 className="text-white text-xl font-bold">{match.home_team.name}</h3>
                    <div className="flex mt-2">
                      {match.home_team.form && match.home_team.form.split('').map((result, i) => (
                        <span 
                          key={i} 
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-1 
                            ${result === 'W' ? 'bg-green-600 text-white' : 
                              result === 'L' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center w-2/12">
                    {isLive ? (
                      <div className="text-center">
                        <div className="bg-red-900/30 px-3 py-1 rounded-md mb-2">
                          <span className="text-red-500 text-sm">{match.time}'</span>
                        </div>
                        <div className="flex items-center justify-center text-3xl font-bold text-white">
                          <span>{match.score.home}</span>
                          <span className="mx-2 text-gray-400">:</span>
                          <span>{match.score.away}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          <span>VS</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center text-center w-5/12">
                    <img 
                      src={match.away_team.logo || "https://via.placeholder.com/64"} 
                      alt={match.away_team.name}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <h3 className="text-white text-xl font-bold">{match.away_team.name}</h3>
                    <div className="flex mt-2">
                      {match.away_team.form && match.away_team.form.split('').map((result, i) => (
                        <span 
                          key={i} 
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-1 
                            ${result === 'W' ? 'bg-green-600 text-white' : 
                              result === 'L' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isLive && match.statistics && (
                  <div className="w-full mt-4">
                    <h4 className="text-white font-medium mb-3">Estatísticas em Tempo Real</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{match.statistics.possession.home}%</span>
                          <span className="text-gray-400">Posse de Bola</span>
                          <span className="text-white">{match.statistics.possession.away}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600 rounded-full" 
                            style={{ width: `${match.statistics.possession.home}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{match.statistics.shots.home}</span>
                          <span className="text-gray-400">Finalizações</span>
                          <span className="text-white">{match.statistics.shots.away}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600 rounded-full" 
                            style={{ width: `${(match.statistics.shots.home / (match.statistics.shots.home + match.statistics.shots.away)) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{match.statistics.shots_on_target.home}</span>
                          <span className="text-gray-400">Chutes no Gol</span>
                          <span className="text-white">{match.statistics.shots_on_target.away}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600 rounded-full" 
                            style={{ width: `${(match.statistics.shots_on_target.home / (match.statistics.shots_on_target.home + match.statistics.shots_on_target.away)) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{match.statistics.corners.home}</span>
                          <span className="text-gray-400">Escanteios</span>
                          <span className="text-white">{match.statistics.corners.away}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600 rounded-full" 
                            style={{ width: `${(match.statistics.corners.home / (match.statistics.corners.home + match.statistics.corners.away)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <div className="flex items-center mr-4">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span>Estádio: {match.stadium}</span>
                </div>
                {match.referee && (
                  <div className="flex items-center">
                    <AlignJustify className="w-4 h-4 mr-1" />
                    <span>Árbitro: {match.referee}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="principais" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="principais">Principais</TabsTrigger>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="populares">
                <TrendingUp className="w-4 h-4 mr-2" />
                Populares
              </TabsTrigger>
              <TabsTrigger value="estatisticas">
                <BarChart3 className="w-4 h-4 mr-2" />
                Estatísticas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="principais">
              <Card className="bg-[#2A2C2E] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Principais Mercados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {match.markets
                    .filter(market => ["Resultado Final", "Ambas Marcam", "Total de Gols"].includes(market.name))
                    .map(market => (
                      <div key={market.id} className="pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium">{market.name}</h3>
                          <Badge className={getBadgeByMarket(market.name)}>
                            {market.outcomes.length} opções
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {market.outcomes.map(outcome => {
                            const isSelected = selectedMarkets.some(
                              item => item.marketId === market.id && item.outcomeId === outcome.id
                            );

                            return (
                              <Button 
                                key={outcome.id} 
                                variant="outline"
                                className={`border-gray-700 text-white hover:bg-green-700 hover:border-green-600 flex flex-col p-3 h-auto ${
                                  isSelected ? 'bg-green-700 border-green-600' : 'bg-transparent'
                                }`}
                                onClick={() => handleAddSelection(market, outcome)}
                              >
                                <span className="text-sm">{outcome.name}</span>
                                <span className="text-lg font-bold">{outcome.odds.toFixed(2)}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="todos">
              <Card className="bg-[#2A2C2E] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Todos os Mercados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {match.markets.map(market => (
                    <div key={market.id} className="pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">{market.name}</h3>
                        <Badge className={getBadgeByMarket(market.name)}>
                          {market.outcomes.length} opções
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {market.outcomes.map(outcome => {
                          const isSelected = selectedMarkets.some(
                            item => item.marketId === market.id && item.outcomeId === outcome.id
                          );

                          return (
                            <Button 
                              key={outcome.id} 
                              variant="outline"
                              className={`border-gray-700 text-white hover:bg-green-700 hover:border-green-600 flex flex-col p-3 h-auto ${
                                isSelected ? 'bg-green-700 border-green-600' : 'bg-transparent'
                              }`}
                              onClick={() => handleAddSelection(market, outcome)}
                            >
                              <span className="text-sm">{outcome.name}</span>
                              <span className="text-lg font-bold">{outcome.odds.toFixed(2)}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="populares">
              <Card className="bg-[#2A2C2E] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Mercados Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-gray-400">
                    Em breve mercados populares baseados nas apostas dos usuários.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estatisticas">
              <Card className="bg-[#2A2C2E] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Estatísticas H2H</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-white font-medium mb-4">Confrontos Diretos</h3>

                  <div className="space-y-3">
                    {match.head_to_head.map((game, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-3">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>{new Date(game.date).toLocaleDateString('pt-BR')}</span>
                          <span>{game.league}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">{game.home_team}</span>
                          <span className="text-white font-medium mx-2">{game.score}</span>
                          <span className="text-white">{game.away_team}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="bg-[#2A2C2E] border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Minha Aposta</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMarkets.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  Selecione mercados para montar sua aposta
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {selectedMarkets.map(selection => (
                      <div key={selection.marketId} className="flex justify-between items-start bg-gray-800 rounded-lg p-3">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">{selection.marketName}</span>
                            <button 
                              className="text-gray-400 hover:text-white"
                              onClick={() => handleRemoveSelection(selection.marketId)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">{selection.outcomeName}</span>
                            <span className="text-white font-bold">{selection.odds.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white">Odds Combinadas</span>
                      <span className="text-white font-bold">{calculateTotalOdds().toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          className="h-10 w-10 p-0 border-gray-700 text-white"
                          onClick={() => setBetValue(Math.max(10, parseFloat(betValue) - 10).toString())}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          value={betValue}
                          onChange={(e) => setBetValue(e.target.value)}
                          className="mx-2 bg-gray-800 border-gray-700 text-white text-center"
                        />
                        <Button 
                          variant="outline" 
                          className="h-10 w-10 p-0 border-gray-700 text-white"
                          onClick={() => setBetValue((parseFloat(betValue) + 10).toString())}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 50, 100].map(amount => (
                          <Button
                            key={amount}
                            variant="outline"
                            className="border-gray-700 text-white"
                            onClick={() => setBetValue(amount.toString())}
                          >
                            R${amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400">Valor da Aposta</span>
                      <span className="text-white">R$ {betValue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Retorno Potencial</span>
                      <span className="text-green-500 font-bold">R$ {calculatePotentialWin()}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {
                    if (selectedMarkets.length === 0) {
                      alert("Selecione pelo menos um mercado para apostar.");
                      return;
                    }

                    const apostaValor = parseFloat(betValue);
                    if (isNaN(apostaValor) || apostaValor <= 0) {
                      alert("Insira um valor válido para a aposta.");
                      return;
                    }

                    const validacao = validarAposta({
                      valor: apostaValor,
                      odds: calculateTotalOdds()
                    }, {
                      status: 'aberto',
                      limite_exposicao: 5000,
                      exposicao_atual: 1000
                    }, {
                      limite_aposta_individual: 1000
                    });

                    if (!validacao.valida) {
                      alert(validacao.mensagem);
                      if (validacao.valor_sugerido) {
                        setBetValue(validacao.valor_sugerido.toString());
                      }
                      return;
                    }

                    alert(`Aposta realizada com sucesso! Potencial de retorno: R$ ${calculatePotentialWin()}`);
                    setSelectedMarkets([]);
                    setBetValue('10');
                  }}>
                    Fazer Aposta
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
