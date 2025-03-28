
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Trophy, 
  Goal, 
  TrendingUp, 
  BarChart3, 
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import APIFootballService from "@/components/utils/APIFootballService";

export default function AoVivo() {
  const [selectedSport, setSelectedSport] = useState("futebol");
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, popular, favorite

  useEffect(() => {
    loadLiveGames();
    const interval = setInterval(() => {
      loadLiveGames();
    }, 30000); // Atualiza a cada 30 segundos
    
    return () => clearInterval(interval);
  }, [selectedSport]);

  const loadLiveGames = async () => {
    setLoading(true);
    try {
      // Simular dados de jogos ao vivo
      setTimeout(() => {
        setLiveGames([
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
            }
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
            }
          },
          {
            id: "3",
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
            }
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar jogos ao vivo:", error);
      setLiveGames([]);
      setLoading(false);
    }
  };

  const filteredGames = liveGames
    .filter(game => 
      game.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) || 
      game.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.league.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(game => {
      if (filter === "all") return true;
      if (filter === "popular") return game.isPopular;
      return true;
    });

  const gamesByLeague = filteredGames.reduce((acc, game) => {
    if (!acc[game.league]) {
      acc[game.league] = [];
    }
    acc[game.league].push(game);
    return acc;
  }, {});

  const addToBetSlip = (game, selection) => {
    alert(`Seleção adicionada: ${selection}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <span className="text-red-500 mr-2">●</span>
          Eventos ao Vivo
        </h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Buscar jogos..." 
              className="pl-10 bg-gray-800 border-gray-700 text-white w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className={`bg-transparent ${filter === 'all' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button 
            variant="outline" 
            className={`bg-transparent ${filter === 'popular' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
            onClick={() => setFilter('popular')}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Populares
          </Button>
        </div>
      </div>

      <Tabs defaultValue="futebol" className="mb-6" onValueChange={setSelectedSport}>
        <TabsList className="w-full">
          <TabsTrigger value="futebol" className="flex items-center gap-2">
            <Goal className="w-4 h-4" />
            Futebol
          </TabsTrigger>
          <TabsTrigger value="basquete" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Basquete
          </TabsTrigger>
          <TabsTrigger value="tenis">Tênis</TabsTrigger>
          <TabsTrigger value="esports">E-Sports</TabsTrigger>
          <TabsTrigger value="volei">Vôlei</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <Card className="p-8 bg-[#2A2C2E] border-gray-700">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        </Card>
      ) : filteredGames.length === 0 ? (
        <Alert className="bg-gray-800 border-gray-700 text-white">
          <AlertDescription>
            Nenhum jogo ao vivo encontrado com os filtros atuais.
          </AlertDescription>
        </Alert>
      ) : (
        Object.entries(gamesByLeague).map(([league, games]) => (
          <Card key={league} className="mb-6 bg-[#2A2C2E] border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-gray-700">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>{league}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {games.map((game) => (
                <div 
                  key={game.id}
                  className="border-b border-gray-700 last:border-0 p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500">
                        Ao Vivo • {game.minute}'
                      </Badge>
                      <span className="text-sm text-gray-400">{game.country}</span>
                    </div>
                    {game.isPopular && (
                      <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{game.homeTeam}</span>
                        <span className="text-xl font-bold text-white">{game.homeScore}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{game.awayTeam}</span>
                        <span className="text-xl font-bold text-white">{game.awayScore}</span>
                      </div>
                    </div>

                    <div className="flex ml-4 gap-2">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="outline"
                          className="flex items-center justify-center h-10 w-16 bg-transparent border-gray-700 text-white hover:bg-green-700 hover:border-green-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToBetSlip(game, `${game.homeTeam} (Casa) - ${game.homeOdds.toFixed(2)}`);
                          }}
                        >
                          {game.homeOdds.toFixed(2)}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center justify-center h-10 w-16 bg-transparent border-gray-700 text-white hover:bg-green-700 hover:border-green-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToBetSlip(game, `Empate - ${game.drawOdds.toFixed(2)}`);
                          }}
                        >
                          {game.drawOdds.toFixed(2)}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center justify-center h-10 w-16 bg-transparent border-gray-700 text-white hover:bg-green-700 hover:border-green-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToBetSlip(game, `${game.awayTeam} (Fora) - ${game.awayOdds.toFixed(2)}`);
                          }}
                        >
                          {game.awayOdds.toFixed(2)}
                        </Button>
                      </div>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 h-full"
                      >
                        +20
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <div className="flex justify-between">
                          <span className="text-white">{game.stats.possession.home}%</span>
                          <span className="text-gray-400">Posse</span>
                          <span className="text-white">{game.stats.possession.away}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${game.stats.possession.home}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="text-white">{game.stats.shots.home}</span>
                          <span className="text-gray-400">Chutes</span>
                          <span className="text-white">{game.stats.shots.away}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(game.stats.shots.home / (game.stats.shots.home + game.stats.shots.away || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="text-white">{game.stats.shotsOnTarget.home}</span>
                          <span className="text-gray-400">No Alvo</span>
                          <span className="text-white">{game.stats.shotsOnTarget.away}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(game.stats.shotsOnTarget.home / (game.stats.shotsOnTarget.home + game.stats.shotsOnTarget.away || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="text-white">{game.stats.corners.home}</span>
                          <span className="text-gray-400">Escanteios</span>
                          <span className="text-white">{game.stats.corners.away}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(game.stats.corners.home / (game.stats.corners.home + game.stats.corners.away || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
