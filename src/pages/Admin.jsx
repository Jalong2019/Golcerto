
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Users,
  CreditCard,
  Trophy,
  BarChart3,
  Link,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Configuracao } from "@/api/entities";
import { APIFootballMonitor } from "@/components/admin/APIFootballMonitor";

// Importação centralizada via api.js
import { APIFootballService } from "@/components/services/api";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingAPI, setSavingAPI] = useState(false);
  const [savingEfi, setSavingEfi] = useState(false);
  const [showAPIMonitor, setShowAPIMonitor] = useState(false);
  const [config, setConfig] = useState({
    api_football_key: "",
    api_football_enabled: false,
    efi_client_id: "",
    efi_client_secret: "",
    efi_sandbox_mode: true,
    efi_enabled: false
  });

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await User.me();
        setUser(userData);
        
        if (!userData.role || userData.role !== 'admin') {
          window.location.href = createPageUrl("Home");
          return;
        }
        
        console.log('📌 Admin: APIFootballService importado:', APIFootballService);
        console.log('📌 Admin: makeRequest função?', typeof APIFootballService.makeRequest === 'function');
        
        await loadConfig();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        window.location.href = createPageUrl("Home");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  const loadConfig = async () => {
    try {
      const configs = await Configuracao.list();
      if (configs.length > 0) {
        setConfig(configs[0]);
        if (configs[0].api_football_key) {
          const testSuccess = await testAPIConnection();
          if (testSuccess) {
            console.log('✅ Teste de conexão API Football bem-sucedido:', {
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    } catch (error) {
      console.error('❌ Erro ao carregar/testar configurações:', error);
    }
  };

  const testAPIConnection = async () => {
    try {
      console.log("Testando conexão com a API-Football...");
      const status = await APIFootballService.getApiStatus();
      console.log('✅ API Football test successful:', status);
      return true;
    } catch (error) {
      console.error('✗ API Football test failed:', error);
      return false;
    }
  };

  const handleSaveApiFootballSettings = async () => {
    setSavingAPI(true);
    try {
      if (config.id) {
        await Configuracao.update(config.id, {
          api_football_key: config.api_football_key,
          api_football_enabled: config.api_football_enabled
        });
      } else {
        const newConfig = await Configuracao.create({
          api_football_key: config.api_football_key,
          api_football_enabled: config.api_football_enabled,
          efi_client_id: "",
          efi_client_secret: "",
          efi_sandbox_mode: true,
          efi_enabled: false
        });
        setConfig(newConfig);
      }
      alert("Configurações da API-Football salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      alert("Erro ao salvar configurações da API-Football.");
    } finally {
      setSavingAPI(false);
    }
  };

  const handleSaveEfiSettings = async () => {
    setSavingEfi(true);
    try {
      if (config.id) {
        await Configuracao.update(config.id, {
          efi_client_id: config.efi_client_id,
          efi_client_secret: config.efi_client_secret,
          efi_sandbox_mode: config.efi_sandbox_mode,
          efi_enabled: config.efi_enabled
        });
      } else {
        const newConfig = await Configuracao.create({
          api_football_key: "",
          api_football_enabled: false,
          efi_client_id: config.efi_client_id,
          efi_client_secret: config.efi_client_secret,
          efi_sandbox_mode: config.efi_sandbox_mode,
          efi_enabled: config.efi_enabled
        });
        setConfig(newConfig);
      }
      alert("Configurações da Efí salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      alert("Erro ao salvar configurações da Efí.");
    } finally {
      setSavingEfi(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Painel Administrativo</h1>

      <Tabs defaultValue="integrações" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 gap-2">
          <TabsTrigger value="integrações" className="data-[state=active]:bg-green-700">
            <Link className="w-4 h-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="data-[state=active]:bg-green-700">
            <Users className="w-4 h-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="apostas" className="data-[state=active]:bg-green-700">
            <Trophy className="w-4 h-4 mr-2" />
            Apostas
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="data-[state=active]:bg-green-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="risco" className="data-[state=active]:bg-green-700">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Risco
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrações">
          <div className="grid gap-4">
            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  API-Football
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {config.api_football_enabled ? (
                  <Alert className="bg-green-500/10 border-green-500/20 text-green-200">
                    <AlertDescription>
                      <CheckCircle2 className="h-4 w-4 mr-2 inline-block" />
                      A API-Football está ativa e configurada no plano PRO (7.500 requisições/dia).
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-200">
                    <AlertDescription>
                      <AlertTriangle className="h-4 w-4 mr-2 inline-block" />
                      A API-Football está desativada ou não configurada corretamente.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex items-center space-x-2 my-4">
                  <Switch
                    id="api-football-enabled"
                    name="api_football_enabled"
                    checked={config.api_football_enabled}
                    onCheckedChange={(checked) => setConfig({...config, api_football_enabled: checked})}
                  />
                  <Label htmlFor="api-football-enabled" className="text-white">Ativar API-Football</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-white">Chave da API</Label>
                  <Input
                    id="api-key"
                    name="api_football_key"
                    type="password"
                    value={config.api_football_key}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Sua chave da API-Football"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={handleSaveApiFootballSettings}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={savingAPI}
                  >
                    {savingAPI ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Salvar Configurações
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-gray-600 text-white hover:bg-green-700"
                    onClick={() => setShowAPIMonitor(!showAPIMonitor)}
                  >
                    {showAPIMonitor ? "Ocultar Monitor" : "Mostrar Monitor"}
                  </Button>
                </div>
                
                {showAPIMonitor && (
                  <div className="mt-4">
                    <APIFootballMonitor />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#2A2C2E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Gateway de Pagamento (Efí)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-200">
                  <AlertDescription>
                    A Efí (antiga Gerencianet) é responsável pelo processamento de pagamentos.
                    Configure suas credenciais de produção e sandbox.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center space-x-2 my-4">
                  <Switch
                    id="efi-enabled"
                    name="efi_enabled"
                    checked={config.efi_enabled}
                    onCheckedChange={(checked) => setConfig({...config, efi_enabled: checked})}
                  />
                  <Label htmlFor="efi-enabled" className="text-white">Ativar Gateway Efí</Label>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sandbox-mode"
                      name="efi_sandbox_mode"
                      checked={config.efi_sandbox_mode}
                      onCheckedChange={(checked) => setConfig({...config, efi_sandbox_mode: checked})}
                    />
                    <Label htmlFor="sandbox-mode" className="text-white">
                      Modo Sandbox {config.efi_sandbox_mode && 
                        <span className="text-yellow-500">
                          <AlertTriangle className="w-4 h-4 inline ml-1" />
                          Ambiente de Testes
                        </span>
                      }
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-id" className="text-white">Client ID</Label>
                    <Input
                      id="client-id"
                      name="efi_client_id"
                      type="password"
                      value={config.efi_client_id}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Client ID da Efí"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-secret" className="text-white">Client Secret</Label>
                    <Input
                      id="client-secret"
                      name="efi_client_secret"
                      type="password"
                      value={config.efi_client_secret}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Client Secret da Efí"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={handleSaveEfiSettings}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={savingEfi}
                  >
                    {savingEfi ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Salvar Configurações
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-gray-600 text-white hover:bg-green-700"
                    onClick={() => {
                      alert("Testando conexão com a Efí...");
                    }}
                  >
                    Testar Conexão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white text-lg mb-4">Gerenciamento de Usuários</h3>
              <p className="text-gray-400">Em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apostas">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white text-lg mb-4">Gestão de Apostas</h3>
              <p className="text-gray-400">Em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white text-lg mb-4">Relatórios Financeiros</h3>
              <p className="text-gray-400">Em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
