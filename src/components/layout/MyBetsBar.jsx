import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createPageUrl } from "@/utils";
import { 
  Clock, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  ArrowRight
} from "lucide-react";

export default function MyBetsBar() {
  const recentBets = [
    {
      id: "1",
      type: "Múltipla",
      status: "pending",
      selections: [
        { game: "Liverpool x Arsenal", selection: "Liverpool" },
        { game: "Barcelona x Real Madrid", selection: "Empate" }
      ],
      amount: 50,
      potentialWin: 180
    },
    {
      id: "2",
      type: "Simples",
      status: "won",
      selections: [
        { game: "PSG x Lyon", selection: "PSG" }
      ],
      amount: 100,
      potentialWin: 175
    },
    {
      id: "3",
      type: "Simples",
      status: "lost",
      selections: [
        { game: "Milan x Inter", selection: "Milan" }
      ],
      amount: 75,
      potentialWin: 150
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        );
      case 'won':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Ganhou
          </Badge>
        );
      case 'lost':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            <XCircle className="w-3 h-3 mr-1" />
            Perdeu
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-[#2A2C2E] border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Minhas Apostas</CardTitle>
          <Button 
            variant="link" 
            className="text-green-500 hover:text-green-400 p-0"
            onClick={() => window.location.href = createPageUrl("MinhasApostas")}
          >
            Ver Todas
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {recentBets.map((bet) => (
            <div
              key={bet.id}
              className="border-b border-gray-700 last:border-0 p-4 hover:bg-gray-800 transition-colors cursor-pointer group"
              onClick={() => window.location.href = createPageUrl(`MinhasApostas?id=${bet.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm text-gray-400">{bet.type}</span>
                </div>
                {getStatusBadge(bet.status)}
              </div>

              {bet.selections.map((selection, idx) => (
                <div key={idx} className="mb-1 last:mb-0">
                  <div className="text-sm text-white">{selection.game}</div>
                  <div className="text-sm text-gray-400">{selection.selection}</div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-2 text-sm">
                <div className="text-gray-400">
                  Apostado: <span className="text-white">R$ {bet.amount.toFixed(2)}</span>
                </div>
                <div className="text-gray-400">
                  Retorno: <span className="text-white">R$ {bet.potentialWin.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-400 p-0">
                  Ver Detalhes
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}