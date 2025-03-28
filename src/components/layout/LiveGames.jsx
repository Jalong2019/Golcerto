
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createPageUrl } from "@/utils";
import { Clock, Trophy, Goal, TrendingUp } from "lucide-react";

// Importação centralizada via api.js
import { APIFootballService } from "@/components/services/api";

export default function LiveGames() {
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLiveGames();
    const interval = setInterval(loadLiveGames, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadLiveGames = async () => {
    setLoading(true);
    try {
      console.log("📌 LiveGames: Carregando jogos ao vivo");
      const data = await APIFootballService.getLiveFixtures();
      console.log("✅ LiveGames: Dados recebidos", data.length);
      setLiveGames(data);
    } catch (error) {
      console.error("❌ Erro ao carregar jogos ao vivo:", error);
      setLiveGames([]);
    } finally {
      setLoading(false);
    }
  };

  const addToBetSlip = (fixture, selection, odds) => {
    console.log(`Adicionando aposta: ${selection} (${odds})`);
  };

  return (
    <Card className="bg-[#2A2C2E] border-gray-700 mb-6">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-gray-700">
        <CardTitle className="flex items-center gap-2 text-white text-lg">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            <span>Ao Vivo</span>
          </div>
        </CardTitle>
        <Button 
          variant="link" 
          className="text-green-500 hover:text-green-400 p-0"
          onClick={() => window.location.href = createPageUrl("AoVivo")}
        >
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        ) : liveGames.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            Nenhum jogo ao vivo no momento
          </div>
        ) : (
          liveGames.map((game) => (
            <div 
              key={game.fixture.id}
              className="border-b border-gray-700 last:border-0 p-4 hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => window.location.href = createPageUrl(`DetalheJogo?id=${game.fixture.id}`)}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500">
                    Ao Vivo • {game.fixture.status.elapsed || '0'}'
                  </Badge>
                  <span className="text-sm text-gray-400">{game.league.name} • {game.league.country}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{game.teams.home.name}</span>
                    <span className="text-xl font-bold text-white">{game.goals.home}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{game.teams.away.name}</span>
                    <span className="text-xl font-bold text-white">{game.goals.away}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
