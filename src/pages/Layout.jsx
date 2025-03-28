

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities"; 
import { 
  User as UserIcon, 
  LogOut, 
  DollarSign,
  Settings,
  Home as HomeIcon,
  BarChart,
  List,
  Wallet,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CountryMenu from "@/components/layout/CountryMenu";
import MyBetsBar from "@/components/layout/MyBetsBar";

export default function Layout({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  
  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-[#1A1C1E]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#1A1C1E]">
      <nav className="bg-[#2A2C2E] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={createPageUrl("Home")} className="flex items-center">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b9c70f_Logo.png" 
                  alt="GolCerto Logo" 
                  className="h-10" 
                />
                <span className="ml-2 text-xl font-bold text-white">GolCerto</span>
              </Link>
              
              <div className="hidden md:flex ml-10 space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-green-700"
                  onClick={() => window.location.href = createPageUrl("Home")}
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Início
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-green-700"
                  onClick={() => window.location.href = createPageUrl("AoVivo")}
                >
                  <BarChart className="w-5 h-5 mr-2" />
                  Ao Vivo
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-green-700"
                  onClick={() => window.location.href = createPageUrl("MinhasApostas")}
                >
                  <List className="w-5 h-5 mr-2" />
                  Minhas Apostas
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    className="bg-orange-500/20 text-orange-400 border-orange-500 hover:bg-orange-500/30"
                    onClick={() => window.location.href = createPageUrl("Admin")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Painel Admin
                  </Button>

                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.location.href = createPageUrl("Deposito")}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Depositar
                  </Button>

                  <div className="hidden md:block text-sm text-white">
                    <span className="text-gray-400">Saldo:</span>
                    <span className="ml-1 font-medium">R$ {user.saldo?.toFixed(2) || "0.00"}</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.full_name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden md:block text-white">{user.full_name || "Usuário"}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-[#2A2C2E] border-gray-700">
                      <DropdownMenuItem
                        className="text-white hover:bg-gray-700"
                        onClick={() => window.location.href = createPageUrl("Perfil")}
                      >
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Meu Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-white hover:bg-gray-700"
                        onClick={() => window.location.href = createPageUrl("MinhasApostas")}
                      >
                        <List className="mr-2 h-4 w-4" />
                        <span>Minhas Apostas</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-white hover:bg-gray-700"
                        onClick={() => window.location.href = createPageUrl("Deposito")}
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>Depósito</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => User.login()}
                >
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-full overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          {children}
        </div>
      </div>

      <footer className="bg-[#2A2C2E] border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b9c70f_Logo.png" 
                alt="GolCerto Logo" 
                className="h-6" 
              />
              <span className="ml-2 text-lg font-bold text-white">GolCerto</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="#" className="hover:text-white">Sobre</Link>
              <Link to="#" className="hover:text-white">Termos de Uso</Link>
              <Link to="#" className="hover:text-white">Privacidade</Link>
              <Link to="#" className="hover:text-white">Suporte</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GolCerto. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

