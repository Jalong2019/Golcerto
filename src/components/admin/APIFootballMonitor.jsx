
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  RefreshCcw
} from "lucide-react";

// Importação centralizada via index.js
import { APIFootballService } from "@/components/services";

export default function APIFootballMonitor() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiStatus = await APIFootballService.getApiStatus();
      console.log("✅ API Status:", apiStatus);
      setStatus(apiStatus);
    } catch (err) {
      console.error("❌ Error fetching API status:", err);
      setError(err.message || "Erro ao verificar status da API");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mr-3" />
            <span className="text-white">Verificando status da API...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <XCircle className="text-red-500 w-5 h-5 mr-2" />
            Erro de Conexão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-red-500/10 border-red-500/20 text-red-200">
            <AlertDescription className="flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Não foi possível conectar à API-Football:</p>
                <p className="mt-1">{error}</p>
              </div>
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <Button
              onClick={checkApiStatus}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <CheckCircle2 className="text-green-500 w-5 h-5 mr-2" />
          API Football Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {status && (
            <>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plano Atual:</span>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500">
                    {status.subscription?.plan || "Pro"}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Requisições Hoje:</span>
                  <span className="text-white font-medium">
                    {status.requests?.current || "0"}/{status.requests?.limit_day || "100"}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Esportes Disponíveis:</span>
                  <span className="text-white font-medium">
                    {status.results > 0 ? status.results : "11"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-full bg-gray-600 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, ((status.requests?.current || 0) / (status.requests?.limit_day || 100)) * 100)}%` 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {Math.min(100, Math.round(((status.requests?.current || 0) / (status.requests?.limit_day || 100)) * 100))}%
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between">
            <Button
              onClick={checkApiStatus}
              className="bg-gray-700 hover:bg-gray-600 text-white"
              size="sm"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Atualizar Status
            </Button>
            
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
              onClick={() => window.open("https://dashboard.api-football.com", "_blank")}
            >
              Dashboard API
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
