import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trophy } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LeagueSection({ league, matches }) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>{league}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {matches.map((match) => (
            <div 
              key={match.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(match.date), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                  </span>
                </div>
                <Badge variant="outline" className="capitalize">
                  {match.status === 'ao_vivo' ? 'Ao Vivo' : 'Em Breve'}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <img 
                      src={match.home_team.logo} 
                      alt={match.home_team.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-medium">{match.home_team.name}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <img 
                      src={match.away_team.logo} 
                      alt={match.away_team.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-medium">{match.away_team.name}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center w-20"
                  >
                    <span className="text-lg font-bold">{match.odds.home}</span>
                    <span className="text-xs text-gray-500">Casa</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center w-20"
                  >
                    <span className="text-lg font-bold">{match.odds.draw}</span>
                    <span className="text-xs text-gray-500">Empate</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center w-20"
                  >
                    <span className="text-lg font-bold">{match.odds.away}</span>
                    <span className="text-xs text-gray-500">Fora</span>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    +{match.odds_count}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}