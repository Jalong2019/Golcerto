
/**
 * api.js - Centralizador de serviços da API
 * Ponto único de importação para todos os serviços,
 * facilitando manutenção e evitando problemas de importação.
 */

import APIFootballService from "@/components/services/APIFootballService";

// Exportamos todos os serviços como objetos nomeados
export {
  APIFootballService
};

// Também exportamos como default para compatibilidade
export default {
  APIFootballService
};
