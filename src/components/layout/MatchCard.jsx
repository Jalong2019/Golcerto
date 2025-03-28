
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Radio } from "lucide-react";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MatchCard({ match, isLive = false }) {
  const navigateToMatchDetails = () => {
    window.location.href = createPageUrl(`DetalheJogo?id=${match.id}`);
  };

  return (
    <Card className="bg-[#2A2C2E] border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer" onClick={navigateToMatchDetails}>
      <CardHeader className="flex flex-row items-center justify-between py-2 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <span className="text-sm text-gray-400">{match.league}</span>
        </div>
        {isLive ? (
          <Badge className="bg-red-500/20 text-red-400 border-red-500 flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" />
            {match.minute || "Ao Vivo"}
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(new Date(match.date), "dd/MM - HH:mm")}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <span className="text-white">{match.home_team}</span>
            {isLive && <span className="text-xl font-bold text-white">{match.homeScore}</span>}
          </div>
          <div className="flex justify-between">
            <span className="text-white">{match.away_team}</span>
            {isLive && <span className="text-xl font-bold text-white">{match.awayScore}</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="text-white bg-transparent border-gray-600 hover:bg-green-700 hover:border-green-600 transition-colors">
            {match.homeOdds?.toFixed(2) || match.odds?.home.toFixed(2)}
          </Button>
          <Button variant="outline" className="text-white bg-transparent border-gray-600 hover:bg-green-700 hover:border-green-600 transition-colors">
            {match.drawOdds?.toFixed(2) || match.odds?.draw.toFixed(2)}
          </Button>
          <Button variant="outline" className="text-white bg-transparent border-gray-600 hover:bg-green-700 hover:border-green-600 transition-colors">
            {match.awayOdds?.toFixed(2) || match.odds?.away.toFixed(2)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
