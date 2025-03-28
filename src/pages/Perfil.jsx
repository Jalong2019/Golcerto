import React, { useState, useEffect } from 'react';
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCircle,
  CreditCard,
  Shield,
  Bell,
  Lock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Save
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    data_nascimento: "",
    endereco: {
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: ""
    }
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
      setFormData({
        nome: userData.full_name || "",
        email: userData.email || "",
        telefone: userData.telefone || "",
        cpf: userData.cpf || "",
        data_nascimento: userData.data_nascimento || "",
        endereco: userData.endereco || {
          cep: "",
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: ""
        }
      });
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updateData = {
        telefone: formData.telefone,
        cpf: formData.cpf,
        data_nascimento: formData.data_nascimento,
        endereco: formData.endereco
      };
      
      await User.updateMyUserData(updateData);
      alert("Perfil atualizado com sucesso!");
      await loadUser();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Meu Perfil</h1>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList className="bg-[#2A2C2E] border-gray-700">
          <TabsTrigger value="info" className="data-[state=active]:bg-green-700">
            <UserCircle className="w-4 h-4 mr-2" />
            Informações Pessoais
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="data-[state=active]:bg-green-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="data-[state=active]:bg-green-700">
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="data-[state=active]:bg-green-700">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Dados Cadastrais</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        className="bg-gray-800 border-gray-700 text-white"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                      <Input
                        id="data_nascimento"
                        name="data_nascimento"
                        type="date"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-white text-lg mb-4">Endereço</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endereco.cep">CEP</Label>
                      <Input
                        id="endereco.cep"
                        name="endereco.cep"
                        value={formData.endereco.cep}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco.rua">Rua</Label>
                      <Input
                        id="endereco.rua"
                        name="endereco.rua"
                        value={formData.endereco.rua}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="endereco.numero">Número</Label>
                      <Input
                        id="endereco.numero"
                        name="endereco.numero"
                        value={formData.endereco.numero}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="endereco.complemento">Complemento</Label>
                      <Input
                        id="endereco.complemento"
                        name="endereco.complemento"
                        value={formData.endereco.complemento}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="endereco.bairro">Bairro</Label>
                      <Input
                        id="endereco.bairro"
                        name="endereco.bairro"
                        value={formData.endereco.bairro}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco.cidade">Cidade</Label>
                      <Input
                        id="endereco.cidade"
                        name="endereco.cidade"
                        value={formData.endereco.cidade}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco.estado">Estado</Label>
                      <Input
                        id="endereco.estado"
                        name="endereco.estado"
                        value={formData.endereco.estado}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Informações Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-lg">Saldo Atual</h3>
                      <p className="text-3xl font-bold text-green-500 mt-2">
                        R$ {(user.saldo || 0).toFixed(2)}
                      </p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Adicionar Fundos
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white text-lg">Histórico de Transações</h3>
                  <p className="text-gray-400">Em breve você terá acesso ao histórico completo de transações.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Segurança da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white">Login e Autenticação</h3>
                      <p className="text-gray-400 mt-1">
                        Sua conta está protegida com login seguro via Google.
                      </p>
                    </div>
                    <Lock className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                <div>
                  <p className="text-gray-400">
                    Recursos adicionais de segurança em breve, incluindo verificação em duas etapas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card className="bg-[#2A2C2E] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Configure como e quando quer receber alertas e informações sobre apostas, promoções e mais.
              </p>
              <p className="text-gray-400">
                Em breve você poderá personalizar todas as suas preferências de notificação.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}