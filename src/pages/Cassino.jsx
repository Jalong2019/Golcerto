import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

export default function Cassino() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Card className="bg-[#2A2C2E] border-gray-700 max-w-lg w-full text-center p-8">
        <CardContent>
          <Gamepad2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Cassino Em Breve!</h1>
          <p className="text-gray-400 mb-6">
            Estamos desenvolvendo uma experiência incrível de cassino para você. 
            Em breve você terá acesso aos melhores jogos de slots, mesa e muito mais!
          </p>
          <Button 
            variant="outline" 
            className="text-white bg-transparent border-gray-600 hover:bg-green-700"
            onClick={() => window.history.back()}
          >
            Voltar para Apostas Esportivas
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}