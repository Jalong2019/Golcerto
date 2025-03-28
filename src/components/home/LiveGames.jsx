
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, RefreshCcw } from "lucide-react";
import { createPageUrl } from "@/utils";

// Importação centralizada via api.js
import { APIFootballService } from "@/components/services/api";

export default function LiveGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLiveGames();
    const interval = setInterval(loadLiveGames, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const loadLiveGames = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("📌 Home/LiveGames: Buscando jogos ao vivo");
      const liveGames = await APIFootballService.getLiveFixtures();
      
      const formattedGames = liveGames.map(item => ({
        id: item.fixture.id,
        league: `${item.league.name} (${item.league.country})`,
        homeTeam: item.teams.home.name,
        awayTeam: item.teams.away.name,
        homeScore: item.goals.home,
        awayScore: item.goals.away,
        homeOdds: 1.5, // Placeholder
        drawOdds: 3.0,
        awayOdds: 6.0,
        minute: item.fixture.status.elapsed || "0"
      }));
      
      console.log(`✅ Home/LiveGames: ${formattedGames.length} jogos encontrados`);
      setGames(formattedGames);
    } catch (err) {
      console.error("❌ Erro ao buscar jogos ao vivo:", err);
      setError("Não foi possível carregar os jogos ao vivo.");
      // Dados mockados de fallback em caso de erro
      setGames([
        {
          id: "fallback1",
          league: "Premier League (Inglaterra)",
          homeTeam: "Liverpool",
          awayTeam: "Arsenal",
          homeScore: 2,
          awayScore: 1,
          homeOdds: 1.5,
          drawOdds: 3.0,
          awayOdds: 6.0,
          minute: "35"
        },
        {
          id: "fallback2",
          league: "Brasileirão (Brasil)",
          homeTeam: "Flamengo",
          awayTeam: "Corinthians",
          homeScore: 0,
          awayScore: 0,
          homeOdds: 1.8,
          drawOdds: 3.2,
          awayOdds: 4.5,
          minute: "20"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#2A2C2E] border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-gray-700">
        <CardTitle className="text-white flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-red-500" />
          <span>Jogos ao Vivo</span>
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700" onClick={loadLiveGames}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button 
            variant="link" 
            className="text-green-500 hover:text-green-400 p-0"
            onClick={() => window.location.href = createPageUrl("AoVivo")}
          >
            Ver Todos
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        ) : error && games.length === 0 ? (
          <div className="py-8 text-center text-red-400">{error}</div>
        ) : games.length === 0 ? (
          <div className="py-8 text-center text-gray-400">Nenhum jogo ao vivo no momento</div>
        ) : (
          games.map((game) => (
            <div
              key={game.id}
              className="border-b border-gray-700 last:border-0 p-4 hover:bg-gray-800 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{game.league}</span>
                <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500">
                  Ao Vivo • {game.minute}'
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{game.homeTeam}</span>
                    <span className="text-xl font-bold text-white">{game.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">{game.awayTeam}</span>
                    <span className="text-xl font-bold text-white">{game.awayScore}</span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" className="text-white border-gray-600 hover:bg-green-700">
                    {game.homeOdds.toFixed(2)}
                  </Button>
                  <Button variant="outline" className="text-white border-gray-600 hover:bg-green-700">
                    {game.drawOdds.toFixed(2)}
                  </Button>
                  <Button variant="outline" className="text-white border-gray-600 hover:bg-green-700">
                    {game.awayOdds.toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
