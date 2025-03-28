import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, ShieldAlert, Lock } from "lucide-react";

export default function RiscoMercado({ mercado }) {
  // Função para determinar o status do risco
  const getRiscoStatus = (exposicao, limite) => {
    const percentual = (exposicao / limite) * 100;
    if (percentual < 50) return { status: "baixo", cor: "text-green-500", icone: <TrendingDown className="w-4 h-4" /> };
    if (percentual < 80) return { status: "médio", cor: "text-yellow-500", icone: <AlertTriangle className="w-4 h-4" /> };
    return { status: "alto", cor: "text-red-500", icone: <ShieldAlert className="w-4 h-4" /> };
  };

  const riscoStatus = getRiscoStatus(mercado.exposicao_atual, mercado.limite_exposicao);

  return (
    <Card className="bg-[#2A2C2E] border-gray-700 hover:border-gray-600 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white flex items-center text-lg">
              {mercado.nome_mercado}
              {mercado.status === "bloqueado" && (
                <Lock className="ml-2 w-4 h-4 text-red-500" />
              )}
            </CardTitle>
            <p className="text-sm text-gray-400">{mercado.nome_evento}</p>
          </div>
          <Badge 
            className={`${
              mercado.status === "aberto" ? "bg-green-500/20 text-green-400" : 
              mercado.status === "limitado" ? "bg-yellow-500/20 text-yellow-400" : 
              "bg-red-500/20 text-red-400"
            }`}
          >
            {mercado.status === "aberto" ? "Aberto" : 
             mercado.status === "limitado" ? "Limitado" : "Bloqueado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Exposição</span>
              <span className={`text-sm font-medium ${riscoStatus.cor} flex items-center`}>
                {riscoStatus.icone}
                <span className="ml-1">R$ {mercado.exposicao_atual.toLocaleString('pt-BR')}</span>
              </span>
            </div>
            <Progress 
              value={(mercado.exposicao_atual / mercado.limite_exposicao) * 100} 
              className="h-2 bg-gray-700"
            />
            <div className="text-xs text-gray-500 mt-1">
              Limite: R$ {mercado.limite_exposicao.toLocaleString('pt-BR')}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {mercado.resultados && mercado.resultados.map((resultado) => (
              <div key={resultado.id} className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">{resultado.nome}</span>
                  <span className="text-xs font-medium">
                    Odds: <span className={resultado.odds_ajustada ? "text-yellow-400" : "text-white"}>
                      {resultado.odds.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Apostado: R$ {resultado.valor_apostado.toLocaleString('pt-BR')}</span>
                  <span className="text-gray-400">Resp: R$ {resultado.responsabilidade.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}