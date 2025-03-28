import React, { useState, useEffect } from 'react';
import { User } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  UserPlus, 
  Edit, 
  Lock, 
  Unlock, 
  UserX,
  Filter,
  AlertTriangle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Em um ambiente real, usaríamos User.list(), mas aqui vamos simular com dados mock via LLM
      const result = await InvokeLLM({
        prompt: "Gere uma lista de 10 usuários para um site de apostas esportivas, com nomes brasileiros, emails, saldo, status (ativo, bloqueado, pendente) e data de criação nos últimos 6 meses",
        response_json_schema: {
          type: "object",
          properties: {
            users: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  saldo: { type: "number" },
                  status: { type: "string", enum: ["ativo", "bloqueado", "pendente"] },
                  created_date: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      });
      
      setUsers(result.users);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  const handleBlockUser = async () => {
    if (!selectedUser) return;
    
    // Simulação de bloquear/desbloquear usuário
    const newStatus = selectedUser.status === "ativo" ? "bloqueado" : "ativo";
    
    // Em um sistema real, usaríamos algo como:
    // await User.update(selectedUser.id, { status: newStatus });
    
    // Atualizar lista local
    setUsers(users.map(user => 
      user.id === selectedUser.id ? {...user, status: newStatus} : user
    ));
    
    setIsBlockDialogOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Convidar Usuário
        </Button>
      </div>

      <Card className="bg-[#2A2C2E] border-gray-700 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar usuários por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white pl-10"
              />
            </div>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Nome</TableHead>
                    <TableHead className="text-gray-400">Email</TableHead>
                    <TableHead className="text-gray-400">Saldo</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Data de Cadastro</TableHead>
                    <TableHead className="text-gray-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-gray-700">
                        <TableCell className="text-white">{user.name}</TableCell>
                        <TableCell className="text-white">{user.email}</TableCell>
                        <TableCell className="text-white">R$ {user.saldo.toFixed(2)}</TableCell>
                        <TableCell>
                          {user.status === "ativo" && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Ativo
                            </span>
                          )}
                          {user.status === "bloqueado" && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              Bloqueado
                            </span>
                          )}
                          {user.status === "pendente" && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Pendente
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-white">
                          {new Date(user.created_date).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsBlockDialogOpen(true);
                              }}
                            >
                              {user.status === "ativo" ? (
                                <Lock className="h-4 w-4" />
                              ) : (
                                <Unlock className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <AlertDialogContent className="bg-[#2A2C2E] border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.status === "ativo" ? (
                "Bloquear Usuário"
              ) : (
                "Desbloquear Usuário"
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {selectedUser?.status === "ativo" ? (
                `Tem certeza que deseja bloquear o usuário ${selectedUser?.name}? Ele não poderá acessar a plataforma até ser desbloqueado.`
              ) : (
                `Tem certeza que deseja desbloquear o usuário ${selectedUser?.name}? Ele poderá acessar a plataforma novamente.`
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className={selectedUser?.status === "ativo" 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-green-600 hover:bg-green-700"
              }
              onClick={handleBlockUser}
            >
              {selectedUser?.status === "ativo" ? (
                "Bloquear"
              ) : (
                "Desbloquear"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}