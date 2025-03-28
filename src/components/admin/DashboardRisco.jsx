import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp, 
  Wallet, 
  Lock, 
  ArrowUp,
  ArrowDown,
  DollarSign,
  Activity
} from "lucide-react";

export default function DashboardRisco({ riscoGlobal, mercadosEmRisco }) {
  const calcularProgressoExposicao = (atual, limite) => {
    return (atual / limite) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#2A2C2E] border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-green-500" />
              Exposição Global
            </CardTitle>
            <CardDescription className="text-gray-400">
              Responsabilidade financeira total em mercados abertos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Exposição Total</span>
                <span className="font-bold text-white">R$ {riscoGlobal.exposicao_total.toLocaleString('pt-BR')}</span>
              </div>
              <Progress 
                value={calcularProgressoExposicao(riscoGlobal.exposicao_total, riscoGlobal.limite_global)} 
                className="h-2 bg-gray-700" 
              />
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">0</span>
                <span className="text-gray-500">Limite: R$ {riscoGlobal.limite_global.toLocaleString('pt-BR')}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-red-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Eventos em Risco</span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xl font-bold text-white">{riscoGlobal.eventos_em_risco}</span>
                </div>

                <div className="bg-red-900/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Bloqueados</span>
                    <Lock className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xl font-bold text-white">{riscoGlobal.eventos_bloqueados}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2C2E] border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Indicadores de Mercado
            </CardTitle>
            <CardDescription className="text-gray-400">
              Resumo de atividades e riscos atuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-400 block mb-2">Mercados Ativos</span>
                    <span className="text-xl font-bold text-white">237</span>
                  </div>
                  <ArrowUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>+12% em relação à semana anterior</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-400 block mb-2">Apostas Hoje</span>
                    <span className="text-xl font-bold text-white">1.342</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>+8% em relação à ontem</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-400 block mb-2">Ajustes de Odds</span>
                    <span className="text-xl font-bold text-white">45</span>
                  </div>
                  <DollarSign className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="mt-2 flex items-center text-xs text-yellow-500">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>12 mercados com alterações hoje</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-400 block mb-2">Alerta Máximo</span>
                    <span className="text-xl font-bold text-red-500">3</span>
                  </div>
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                </div>
                <div className="mt-2 flex items-center text-xs text-red-500">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  <span>Exposição próxima do limite</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#2A2C2E] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Mercados com Maior Exposição</CardTitle>
          <CardDescription className="text-gray-400">
            Os 3 mercados com maior risco atualmente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mercadosEmRisco.map((mercado, index) => (
              <div key={mercado.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="text-sm text-gray-400">{mercado.nome_evento}</span>
                    <h4 className="text-white font-medium">{mercado.nome_mercado}</h4>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    mercado.status === 'aberto' ? 'bg-green-500/20 text-green-400' : 
                    mercado.status === 'limitado' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {mercado.status.charAt(0).toUpperCase() + mercado.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Exposição</span>
                    <span className="text-white">R$ {mercado.exposicao_atual.toLocaleString('pt-BR')}</span>
                  </div>
                  <Progress 
                    value={(mercado.exposicao_atual / mercado.limite_exposicao) * 100} 
                    className="h-1.5 bg-gray-700"
                    indicatorClassName={`${
                      mercado.status === 'aberto' ? 'bg-green-500' : 
                      mercado.status === 'limitado' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                  />
                  <div className="flex justify-end text-xs text-gray-500">
                    Limite: R$ {mercado.limite_exposicao.toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}