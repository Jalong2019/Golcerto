
import React, { useState } from 'react';
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CreditCard, 
  Wallet, 
  QrCode,
  Copy,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function Deposito() {
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);
  const [codigoPix, setCodigoPix] = useState(null);
  const [status, setStatus] = useState(null); // pending, success, error

  const valoresPreDefinidos = [50, 100, 200, 500];

  const handleDeposito = async () => {
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      alert("Por favor, insira um valor válido");
      return;
    }

    setLoading(true);
    try {
      // Simulação de geração de código PIX
      setTimeout(() => {
        setCodigoPix("00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000");
        setStatus("pending");
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      setStatus("error");
      setLoading(false);
    }
  };

  const copiarCodigoPix = () => {
    navigator.clipboard.writeText(codigoPix);
    alert("Código PIX copiado!");
  };

  // Simular atualização de status
  React.useEffect(() => {
    if (status === "pending") {
      const timer = setTimeout(() => {
        setStatus("success");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Depósito</h1>

      {status === "success" ? (
        <Card className="bg-[#2A2C2E] border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Depósito Confirmado!</h2>
              <p className="text-gray-400 mb-6">
                Seu depósito de R$ {parseFloat(valor).toFixed(2)} foi processado com sucesso.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = createPageUrl("Home")}
              >
                Voltar para Início
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="bg-[#2A2C2E] border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Valor do Depósito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="valor">Valor (R$)</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="0.00"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {valoresPreDefinidos.map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      className="bg-transparent border-gray-700 text-white hover:bg-green-700"
                      onClick={() => setValor(value.toString())}
                    >
                      R$ {value}
                    </Button>
                  ))}
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleDeposito}
                  disabled={loading || !valor}
                >
                  {loading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Gerando PIX...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Depositar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {codigoPix && status === "pending" && (
            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardContent className="pt-6">
                <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-200 mb-6">
                  <AlertDescription className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Aguardando pagamento...
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col items-center mb-6">
                  <QrCode className="w-48 h-48 text-white mb-4" />
                  <p className="text-gray-400 text-sm text-center mb-4">
                    Escaneie o QR Code ou copie o código PIX abaixo
                  </p>
                  <div className="w-full p-3 bg-gray-800 rounded-lg flex items-center justify-between">
                    <code className="text-sm text-gray-300 break-all mr-2">{codigoPix}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copiarCodigoPix}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-200">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="w-4 h-4 mr-2 mt-0.5" />
                    <span>
                      O pagamento pode levar até 30 segundos para ser confirmado. 
                      Não feche esta janela até a confirmação.
                    </span>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
