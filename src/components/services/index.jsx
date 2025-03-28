/**
 * Centralizador de todos os serviços da API
 * Este arquivo serve como ponto único de importação para todos os serviços,
 * evitando problemas de importação e facilitando a manutenção.
 */

import APIFootballService from './APIFootballService';

// Exportamos todos os serviços como objetos nomeados
export {
  APIFootballService
};

// Também exportamos como default para compatibilidade
export default {
  APIFootballService
};