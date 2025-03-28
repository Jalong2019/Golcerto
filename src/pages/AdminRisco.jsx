import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldAlert,
  BarChart3,
  Settings,
  Save,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowDownUp,
  Lock,
  Percent
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import DashboardRisco from '../components/admin/DashboardRisco';
import RiscoMercado from '../components/admin/RiscoMercado';

export default function AdminRisco() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [riscoGlobal, setRiscoGlobal] = useState({
    exposicao_total: 42500,
    limite_global: 100000,
    eventos_em_risco: 3,
    eventos_bloqueados: 1
  });
  
  const [configuracoes, setConfiguracoes] = useState({
    margem_padrao: 5,
    limite_exposicao_global: 100000,
    limite_exposicao_evento: 10000,
    limite_exposicao_mercado: 5000,
    limite_aposta_individual: 1000,
    ajuste_automatico_ativado: true,
    threshold_ajuste_odds: 70,
    fator_ajuste_odds: 0.05
  });
  
  const [mercadosEmRisco, setMercadosEmRisco] = useState([
    {
      id: "merc1",
      nome_evento: "Barcelona vs Real Madrid",
      nome_mercado: "Resultado Final",
      exposicao_atual: 8500,
      limite_exposicao: 10000,
      status: "limitado",
      resultados: [
        {id: "res1", nome: "Barcelona", odds: 2.1, odds_ajustada: true, valor_apostado: 4000, responsabilidade: 8400},
        {id: "res2", nome: "Empate", odds: 3.2, odds_ajustada: false, valor_apostado: 2500, responsabilidade: 8000},
        {id: "res3", nome: "Real Madrid", odds: 3.5, odds_ajustada: false, valor_apostado: 3000, responsabilidade: 10500}
      ]
    },
    {
      id: "merc2",
      nome_evento: "Liverpool vs Manchester City",
      nome_mercado: "Total de Gols",
      exposicao_atual: 4700,
      limite_exposicao: 5000,
      status: "aberto",
      resultados: [
        {id: "res1", nome: "Menos de 2.5", odds: 2.3, odds_ajustada: false, valor_apostado: 2000, responsabilidade: 4600},
        {id: "res2", nome: "Mais de 2.5", odds: 1.7, odds_ajustada: false, valor_apostado: 2700, responsabilidade: 4590}
      ]
    },
    {
      id: "merc3",
      nome_evento: "Flamengo vs Palmeiras",
      nome_mercado: "Ambas Equipes Marcam",
      exposicao_atual: 4950,
      limite_exposicao: 5000,
      status: "bloqueado",
      resultados: [
        {id: "res1", nome: "Sim", odds: 1.9, odds_ajustada: true, valor_apostado: 3000, responsabilidade: 5700},
        {id: "res2", nome: "Não", odds: 2.1, odds_ajustada: true, valor_apostado: 2000, responsabilidade: 4200}
      ]
    }
  ]);

  useEffect(() => {
    simulateLoading();
  }, [activeTab]);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleSaveSettings = () => {
    simulateLoading();
    setTimeout(() => {
      alert("Configurações de risco salvas com sucesso!");
    }, 800);
  };

  const getPercentualExposicao = (atual, limite) => {
    return (atual / limite) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <ShieldAlert className="w-6 h-6 mr-2 text-orange-500" />
          Gerenciamento de Risco
        </h1>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard de Risco
          </TabsTrigger>
          <TabsTrigger value="mercados" className="data-[state=active]:bg-green-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Mercados em Risco
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="data-[state=active]:bg-green-700">
            <Settings className="w-4 h-4 mr-2" />
            Configurações de Risco
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {loading ? (
            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <DashboardRisco riscoGlobal={riscoGlobal} mercadosEmRisco={mercadosEmRisco} />
          )}
        </TabsContent>

        <TabsContent value="mercados">
          {loading ? (
            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card className="bg-[#2A2C2E] border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar mercados ou eventos..."
                        className="bg-gray-800 border-gray-700 text-white pl-10"
                      />
                    </div>
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                      <ArrowDownUp className="w-4 h-4 mr-2" />
                      Ordenar
                    </Button>
                  </div>

                  <Alert className="bg-orange-500/10 border-orange-500/20 text-orange-200 mb-4">
                    <AlertDescription className="flex items-start">
                      <AlertTriangle className="w-4 h-4 mr-2 mt-0.5" />
                      <span>
                        Existem 3 mercados em situação de risco elevado e 1 mercado bloqueado atualmente. 
                        É recomendado revisar as exposições atuais.
                      </span>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    {mercadosEmRisco.map((mercado) => (
                      <RiscoMercado key={mercado.id} mercado={mercado} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="configuracoes">
          {loading ? (
            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configurações do Sistema de Risco</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-200">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="w-4 h-4 mr-2 mt-0.5" />
                    <span>
                      Estas configurações controlam como o sistema gerencia o risco automaticamente. 
                      Ajuste com cuidado, pois impactam diretamente os limites de apostas e a lucratividade.
                    </span>
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-medium">Margens e Odds</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="margem_padrao" className="flex items-center">
                        <Percent className="w-4 h-4 mr-2 text-gray-400" />
                        Margem Padrão (%)
                      </Label>
                      <Input
                        id="margem_padrao"
                        type="number"
                        value={configuracoes.margem_padrao}
                        onChange={(e) => setConfiguracoes({...configuracoes, margem_padrao: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Percentual de margem aplicado sobre as odds teóricas
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ajuste_automatico"
                          checked={configuracoes.ajuste_automatico_ativado}
                          onCheckedChange={(value) => setConfiguracoes({...configuracoes, ajuste_automatico_ativado: value})}
                        />
                        <Label htmlFor="ajuste_automatico">Ajuste Automático de Odds</Label>
                      </div>
                      <p className="text-sm text-gray-400">
                        Quando ativado, as odds são ajustadas automaticamente com base na exposição
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-medium">Limites de Exposição</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="limite_global">Limite Global (R$)</Label>
                      <Input
                        id="limite_global"
                        type="number"
                        value={configuracoes.limite_exposicao_global}
                        onChange={(e) => setConfiguracoes({...configuracoes, limite_exposicao_global: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Exposição máxima total permitida em todas as apostas
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="limite_evento">Limite por Evento (R$)</Label>
                      <Input
                        id="limite_evento"
                        type="number"
                        value={configuracoes.limite_exposicao_evento}
                        onChange={(e) => setConfiguracoes({...configuracoes, limite_exposicao_evento: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Exposição máxima permitida por evento esportivo
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="limite_mercado">Limite por Mercado (R$)</Label>
                      <Input
                        id="limite_mercado"
                        type="number"
                        value={configuracoes.limite_exposicao_mercado}
                        onChange={(e) => setConfiguracoes({...configuracoes, limite_exposicao_mercado: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Exposição máxima permitida para cada tipo de mercado
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="limite_aposta">Limite por Aposta (R$)</Label>
                      <Input
                        id="limite_aposta"
                        type="number"
                        value={configuracoes.limite_aposta_individual}
                        onChange={(e) => setConfiguracoes({...configuracoes, limite_aposta_individual: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Valor máximo que um usuário pode apostar em um único mercado
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-medium">Parâmetros de Ajuste</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="threshold_ajuste">Threshold de Ajuste (%)</Label>
                      <Input
                        id="threshold_ajuste"
                        type="number"
                        value={configuracoes.threshold_ajuste_odds}
                        onChange={(e) => setConfiguracoes({...configuracoes, threshold_ajuste_odds: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Percentual da exposição que ativa o ajuste automático
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fator_ajuste">Fator de Ajuste</Label>
                      <Input
                        id="fator_ajuste"
                        type="number"
                        step="0.01"
                        value={configuracoes.fator_ajuste_odds}
                        onChange={(e) => setConfiguracoes({...configuracoes, fator_ajuste_odds: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Fator aplicado às odds quando os limites são atingidos
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-gray-700">
                  <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}