import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Search,
  ArrowDown,
  CheckCircle,
  XCircle,
  Loader,
  Filter,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MinhasApostas() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    loadBets();
  }, []);

  const loadBets = async () => {
    setLoading(true);
    try {
      // Simular dados de apostas
      setTimeout(() => {
        setBets([
          {
            id: "1",
            date: "2023-05-10T19:30:00",
            amount: 100,
            potentialWin: 350,
            status: "pending",
            type: "multiple",
            sport: "Futebol",
            selections: [
              {
                game: "Flamengo vs Corinthians",
                league: "Campeonato Brasileiro",
                selection: "Flamengo",
                odds: 1.85,
                status: "pending"
              },
              {
                game: "Barcelona vs Real Madrid",
                league: "La Liga",
                selection: "Empate",
                odds: 3.25,
                status: "pending"
              }
            ]
          },
          {
            id: "2",
            date: "2023-05-09T16:00:00",
            amount: 50,
            potentialWin: 125,
            status: "won",
            type: "single",
            sport: "Futebol",
            selections: [
              {
                game: "Bayern Munich vs Borussia Dortmund",
                league: "Bundesliga",
                selection: "Bayern Munich",
                odds: 2.50,
                status: "won"
              }
            ]
          },
          {
            id: "3",
            date: "2023-05-08T14:30:00",
            amount: 75,
            potentialWin: 200,
            status: "lost",
            type: "single",
            sport: "Futebol",
            selections: [
              {
                game: "Manchester City vs Liverpool",
                league: "Premier League",
                selection: "Liverpool",
                odds: 2.70,
                status: "lost"
              }
            ]
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar apostas:", error);
      setBets([]);
      setLoading(false);
    }
  };

  const filterBets = (bet) => {
    const searchMatch = searchTerm === "" || 
      bet.selections.some(s => 
        s.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.selection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.league.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const statusMatch = statusFilter === "all" || bet.status === statusFilter;
    
    const betDate = new Date(bet.date);
    const now = new Date();
    let dateMatch = true;
    
    if (dateRange === "today") {
      const today = new Date();
      dateMatch = betDate.toDateString() === today.toDateString();
    } else if (dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      dateMatch = betDate >= weekAgo;
    } else if (dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      dateMatch = betDate >= monthAgo;
    }
    
    return searchMatch && statusMatch && dateMatch;
  };

  const filteredBets = bets
    .filter(filterBets)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Minhas Apostas</h1>
      
      <Card className="bg-[#2A2C2E] border-gray-700 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar apostas..." 
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                className={`bg-transparent ${statusFilter === 'all' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setStatusFilter('all')}
              >
                Todas
              </Button>
              <Button
                variant="outline"
                className={`bg-transparent ${statusFilter === 'pending' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setStatusFilter('pending')}
              >
                <Loader className="mr-2 h-4 w-4" />
                Em Andamento
              </Button>
              <Button
                variant="outline"
                className={`bg-transparent ${statusFilter === 'won' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setStatusFilter('won')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Ganhas
              </Button>
              <Button
                variant="outline"
                className={`bg-transparent ${statusFilter === 'lost' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setStatusFilter('lost')}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Perdidas
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                className={`bg-transparent ${dateRange === 'all' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setDateRange('all')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Todas datas
              </Button>
              <Button
                variant="outline"
                className={`bg-transparent ${dateRange === 'today' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setDateRange('today')}
              >
                Hoje
              </Button>
              <Button
                variant="outline"
                className={`bg-transparent ${dateRange === 'week' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setDateRange('week')}
              >
                Última semana
              </Button>
              <Button
                variant="outline"
                className={`bg-transparent ${dateRange === 'month' ? 'border-green-500 text-green-500' : 'border-gray-600 text-white'} hover:bg-green-700 hover:text-white`}
                onClick={() => setDateRange('month')}
              >
                Último mês
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-white hover:bg-gray-700 mt-3 md:mt-0"
              onClick={toggleSortOrder}
            >
              <ArrowDown className={`mr-2 h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              Data {sortOrder === 'desc' ? 'Recente' : 'Antiga'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500" />
        </div>
      ) : filteredBets.length === 0 ? (
        <Card className="bg-[#2A2C2E] border-gray-700">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400">
              Nenhuma aposta encontrada com os filtros atuais.
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBets.map((bet) => (
            <Card key={bet.id} className="bg-[#2A2C2E] border-gray-700">
              <CardHeader className="p-4 border-b border-gray-700 flex flex-row justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <CardTitle className="text-white text-lg">
                      {bet.type === 'single' ? 'Aposta Simples' : 'Aposta Múltipla'} - {bet.sport}
                    </CardTitle>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(bet.date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <div>
                  {bet.status === 'pending' && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                      <Loader className="w-3 h-3 mr-1 animate-spin" />
                      Em Andamento
                    </Badge>
                  )}
                  {bet.status === 'won' && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ganha
                    </Badge>
                  )}
                  {bet.status === 'lost' && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500">
                      <XCircle className="w-3 h-3 mr-1" />
                      Perdida
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 mb-4">
                  {bet.selections.map((selection, index) => (
                    <div key={index} className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">{selection.league}</span>
                        {selection.status === 'pending' ? (
                          <Badge variant="outline" className="bg-transparent text-blue-400 border-blue-500">
                            Em Andamento
                          </Badge>
                        ) : selection.status === 'won' ? (
                          <Badge variant="outline" className="bg-transparent text-green-400 border-green-500">
                            Acertou
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-transparent text-red-400 border-red-500">
                            Errou
                          </Badge>
                        )}
                      </div>
                      <p className="text-white mb-1">{selection.game}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">{selection.selection}</span>
                        <span className="text-white font-bold">{selection.odds.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Valor apostado</p>
                      <p className="text-white font-bold">R$ {bet.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Possível retorno</p>
                      <p className="text-white font-bold">R$ {bet.potentialWin.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-0">
                    <Button 
                      className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
                      onClick={() => alert(`Detalhes da aposta ${bet.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}