
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock } from "lucide-react";
import LiveGames from "@/components/layout/LiveGames";
import BannerCarousel from "@/components/layout/BannerCarousel";
import APIFootballService from "@/services/APIFootballService"; // Importação corrigida

export default function Home() {
  const [selectedSport, setSelectedSport] = useState("futebol");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [selectedSport]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setMatches([
          {
            id: "1",
            league: "Campeonato Brasileiro",
            homeTeam: "Flamengo",
            awayTeam: "Corinthians",
            time: "19:30",
            date: "2024-03-10",
            homeOdds: 1.85,
            drawOdds: 3.40,
            awayOdds: 4.50
          },
          {
            id: "2",
            league: "Campeonato Brasileiro",
            homeTeam: "São Paulo",
            awayTeam: "Palmeiras",
            time: "16:00",
            date: "2024-03-10",
            homeOdds: 2.25,
            drawOdds: 3.20,
            awayOdds: 3.10
          },
          {
            id: "3",
            league: "Premier League",
            homeTeam: "Liverpool",
            awayTeam: "Manchester City",
            time: "12:30",
            date: "2024-03-10",
            homeOdds: 2.40,
            drawOdds: 3.30,
            awayOdds: 2.80
          },
          {
            id: "4",
            league: "La Liga",
            homeTeam: "Barcelona",
            awayTeam: "Real Madrid",
            time: "16:00",
            date: "2024-03-10",
            homeOdds: 2.10,
            drawOdds: 3.40,
            awayOdds: 3.30
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full mb-6">
        <BannerCarousel />
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Button 
          variant={selectedSport === "futebol" ? "default" : "ghost"}
          className={`${selectedSport === "futebol" ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 text-gray-300 hover:text-white"}`}
          onClick={() => setSelectedSport("futebol")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 3.8C13.8 3.8 15.5 4.4 16.9 5.4L16 6.8C15.5 7.6 14.8 8.3 14 8.8L10 7.5V6.8C10 5.5 10.9 4.3 12 3.8ZM5.5 16.9C4.4 15.5 3.8 13.8 3.8 12C3.8 10.2 4.4 8.5 5.4 7.1L6.8 8C7.6 8.5 8.3 9.2 8.8 10L7.5 14H6.8C5.5 14 4.3 13.1 3.8 12C4.3 13.1 4.5 15.1 5.5 16.9Z" fill="currentColor"/>
          </svg>
          Futebol
        </Button>
        
        <Button 
          variant={selectedSport === "basquete" ? "default" : "ghost"}
          className={`${selectedSport === "basquete" ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 text-gray-300 hover:text-white"}`}
          onClick={() => setSelectedSport("basquete")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
          </svg>
          Basquete
        </Button>
        
        <Button 
          variant={selectedSport === "tenis" ? "default" : "ghost"}
          className={`${selectedSport === "tenis" ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 text-gray-300 hover:text-white"}`}
          onClick={() => setSelectedSport("tenis")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.52 2.49C15.63 -1.4 9.33 -0.8 5.43 3.1" fill="currentColor"/>
          </svg>
          Tênis
        </Button>
        
        <Button 
          variant={selectedSport === "volei" ? "default" : "ghost"}
          className={`${selectedSport === "volei" ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 text-gray-300 hover:text-white"}`}
          onClick={() => setSelectedSport("volei")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
          </svg>
          Vôlei
        </Button>
      </div>

      <div className="w-full mb-6">
        <LiveGames />
      </div>

      <Card className="bg-gray-800 border-gray-700 w-full">
        <CardHeader className="border-b border-gray-700">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-green-500" />
              Próximos Jogos
            </CardTitle>
            <Button variant="ghost" className="text-green-500 hover:text-green-400">
              Ver Todas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
            </div>
          ) : (
            <div className="grid gap-4">
              {matches.map((match) => (
                <Card key={match.id} className="bg-gray-700 hover:bg-gray-600 transition-colors overflow-hidden">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-7 gap-2 items-center">
                      <div className="col-span-3 text-right">
                        <div className="font-medium text-white">{match.homeTeam}</div>
                      </div>
                      
                      <div className="col-span-1 flex flex-col items-center justify-center">
                        <Badge variant="outline" className="bg-gray-800 text-gray-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {match.time}
                        </Badge>
                      </div>
                      
                      <div className="col-span-3">
                        <div className="font-medium text-white">{match.awayTeam}</div>
                      </div>
                      
                      <Button 
                        className="col-span-2 bg-green-700 hover:bg-green-600 text-white"
                        onClick={() => addToBetSlip({
                          id: `${match.id}_1`,
                          matchId: match.id,
                          type: '1',
                          selection: match.homeTeam,
                          odds: match.homeOdds
                        })}
                      >
                        {match.homeOdds}
                      </Button>
                      
                      <Button 
                        className="col-span-3 bg-green-700 hover:bg-green-600 text-white"
                        onClick={() => addToBetSlip({
                          id: `${match.id}_X`,
                          matchId: match.id,
                          type: 'X',
                          selection: 'Empate',
                          odds: match.drawOdds
                        })}
                      >
                        {match.drawOdds}
                      </Button>
                      
                      <Button 
                        className="col-span-2 bg-green-700 hover:bg-green-600 text-white"
                        onClick={() => addToBetSlip({
                          id: `${match.id}_2`,
                          matchId: match.id,
                          type: '2',
                          selection: match.awayTeam,
                          odds: match.awayOdds
                        })}
                      >
                        {match.awayOdds}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function addToBetSlip(bet) {
  console.log("Adicionando aposta:", bet);
}
