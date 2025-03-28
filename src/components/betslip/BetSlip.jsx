import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Trash2, 
  ReceiptText, 
  Calculator, 
  ChevronDown, 
  ChevronUp,
  Target
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "@/api/entities";

export default function BetSlip({ isOpen, setIsOpen, selections = [], clearSelections, removeSelection }) {
  const [betValue, setBetValue] = useState(10);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await User.me();
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const calculateTotalOdds = () => {
    if (selections.length === 0) return 0;
    return selections.reduce((acc, selection) => acc * selection.odds, 1).toFixed(2);
  };

  const calculatePotentialReturn = () => {
    const totalOdds = calculateTotalOdds();
    return (betValue * totalOdds).toFixed(2);
  };

  const handlePlaceBet = async () => {
    if (!isAuthenticated) {
      User.login();
      return;
    }

    if (selections.length === 0) {
      alert("Adicione pelo menos uma seleção para apostar");
      return;
    }

    if (betValue <= 0) {
      alert("Insira um valor válido para a aposta");
      return;
    }

    setLoading(true);
    try {
      // Simular envio de aposta
      setTimeout(() => {
        alert(`Aposta realizada com sucesso!\nValor: R$ ${betValue}\nRetorno Possível: R$ ${calculatePotentialReturn()}`);
        clearSelections();
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao realizar aposta:", error);
      alert("Erro ao realizar aposta. Tente novamente.");
      setLoading(false);
    }
  };

  const predefinedValues = [10, 20, 50, 100];
  
  return (
    <>
      {/* Botão fixo para dispositivos móveis */}
      <div className="fixed bottom-4 right-4 md:hidden z-30">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16 shadow-lg"
        >
          <div className="flex flex-col items-center">
            <ReceiptText className="w-6 h-6" />
            {selections.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 border-none">
                {selections.length}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Painel do BetSlip */}
      <div 
        className={`fixed top-0 bottom-0 right-0 w-full md:w-96 bg-[#2A2C2E] border-l border-gray-700 shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:static md:shadow-none md:border-none`}
      >
        <Card className="h-full border-none rounded-none md:border md:rounded-lg md:h-auto bg-[#2A2C2E]">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
            <CardTitle className="flex items-center text-white">
              <ReceiptText className="w-5 h-5 mr-2 text-green-500" />
              Bilhete de Apostas
              {selections.length > 0 && (
                <Badge className="ml-2 bg-green-600">
                  {selections.length}
                </Badge>
              )}
            </CardTitle>
            
            <div className="flex items-center gap-2">
              {selections.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-700"
                  onClick={clearSelections}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[calc(100%-60px)] md:h-[500px]">
            {selections.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-400">
                <Target className="w-12 h-12 text-gray-600 mb-4" />
                <p>Seu bilhete está vazio</p>
                <p className="text-sm mt-2">Clique nas odds para adicionar seleções</p>
              </div>
            ) : (
              <>
                {/* Lista de seleções */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence>
                    {selections.map((selection, index) => (
                      <motion.div
                        key={selection.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                        className="border-b border-gray-700 p-4 relative"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8"
                          onClick={() => removeSelection(selection.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>

                        <div className="mb-2">
                          <span className="text-xs text-gray-400">{selection.league}</span>
                        </div>
                        
                        <div className="mb-1">
                          <span className="text-white font-medium">{selection.game}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500 font-normal">
                            {selection.market}: {selection.selection}
                          </Badge>
                          <span className="text-green-500 font-bold">{selection.odds.toFixed(2)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Rodapé com valor da aposta */}
                <div className="p-4 bg-gray-800 border-t border-gray-700">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Odd Total:</span>
                      <span className="text-white font-bold">{calculateTotalOdds()}</span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Valor da Aposta (R$):</span>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <Input
                          type="number"
                          value={betValue}
                          onChange={(e) => setBetValue(parseFloat(e.target.value) || 0)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {predefinedValues.map(value => (
                          <Button
                            key={value}
                            variant="outline"
                            className="bg-transparent border-gray-600 text-white hover:bg-green-700"
                            onClick={() => setBetValue(value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mb-2 text-lg">
                      <span className="text-gray-400">Retorno Possível:</span>
                      <span className="text-green-500 font-bold">R$ {calculatePotentialReturn()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceBet}
                    disabled={selections.length === 0 || loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processando...
                      </>
                    ) : !isAuthenticated ? (
                      "Entrar para Apostar"
                    ) : (
                      "Fazer Aposta"
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}