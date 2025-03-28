
// Sistema de Gerenciamento de Risco para o GolCerto

import APIFootballService from "@/components/utils/APIFootballService";

const GerenciadorRisco = {
  /**
   * Calcula a margem (overround) embutida em um mercado
   */
  calcularMargem: (odds) => {
    if (!odds || !odds.length) return 0;
    const probabilidadeImplicita = odds.reduce((acc, odd) => acc + (1 / odd), 0);
    return ((probabilidadeImplicita - 1) * 100).toFixed(2);
  },

  /**
   * Aplica margem a um conjunto de probabilidades para calcular odds
   */
  aplicarMargem: (probabilidades, margem) => {
    const fatorMargem = 1 + (margem / 100);
    return probabilidades.map(prob => (1 / (prob * fatorMargem)).toFixed(2));
  },

  /**
   * Calcula a exposição ao risco para cada resultado em um mercado
   */
  calcularExposicao: (apostas) => {
    const exposicaoPorResultado = {};
    let exposicaoTotal = 0;
    
    apostas.forEach(aposta => {
      if (!exposicaoPorResultado[aposta.resultado_id]) {
        exposicaoPorResultado[aposta.resultado_id] = {
          nome: aposta.resultado_nome,
          valor_apostado: 0,
          responsabilidade: 0
        };
      }
      
      exposicaoPorResultado[aposta.resultado_id].valor_apostado += aposta.valor;
      exposicaoPorResultado[aposta.resultado_id].responsabilidade += aposta.valor * aposta.odds;
    });
    
    Object.keys(exposicaoPorResultado).forEach(resultadoId => {
      const resultado = exposicaoPorResultado[resultadoId];
      const responsabilidade = resultado.responsabilidade - resultado.valor_apostado;
      
      let valorApostadoOutrosResultados = 0;
      Object.keys(exposicaoPorResultado).forEach(outroId => {
        if (outroId !== resultadoId) {
          valorApostadoOutrosResultados += exposicaoPorResultado[outroId].valor_apostado;
        }
      });
      
      const exposicao = responsabilidade - valorApostadoOutrosResultados;
      resultado.exposicao = exposicao > 0 ? exposicao : 0;
      
      if (resultado.exposicao > exposicaoTotal) {
        exposicaoTotal = resultado.exposicao;
      }
    });
    
    return {
      exposicaoPorResultado,
      exposicaoTotal
    };
  },

  /**
   * Avalia se um mercado deve ser limitado ou bloqueado baseado na exposição atual
   */
  avaliarStatusMercado: (mercado, config) => {
    const percentualExposicao = (mercado.exposicao_atual / mercado.limite_exposicao) * 100;
    
    if (percentualExposicao >= 95) {
      return 'bloqueado';
    } else if (percentualExposicao >= 75) {
      return 'limitado';
    }
    
    return 'aberto';
  },

  /**
   * Calcula o valor máximo de aposta permitido baseado no status do mercado
   */
  calcularLimiteAposta: (mercado, config) => {
    if (mercado.status === 'bloqueado') {
      return 0;
    }
    
    if (mercado.status === 'limitado') {
      return Math.min(
        config.limite_aposta_individual * 0.5,
        (mercado.limite_exposicao - mercado.exposicao_atual) * 0.5
      );
    }
    
    return Math.min(
      config.limite_aposta_individual,
      mercado.limite_exposicao - mercado.exposicao_atual
    );
  },

  /**
   * Ajusta as odds com base na exposição atual
   */
  ajustarOdds: (mercado, config) => {
    if (!config.ajuste_automatico_ativado) {
      return mercado.resultados.map(r => ({ ...r }));
    }
    
    let maiorExposicao = { valor: 0, id: null };
    mercado.resultados.forEach(resultado => {
      if (resultado.responsabilidade > maiorExposicao.valor) {
        maiorExposicao = { valor: resultado.responsabilidade, id: resultado.id };
      }
    });
    
    const percentualExposicao = (mercado.exposicao_atual / mercado.limite_exposicao) * 100;
    if (percentualExposicao < config.threshold_ajuste_odds) {
      return mercado.resultados.map(r => ({ ...r }));
    }
    
    return mercado.resultados.map(resultado => {
      const novaOdds = resultado.id === maiorExposicao.id 
        ? resultado.odds * (1 - config.fator_ajuste_odds) 
        : resultado.odds * (1 + config.fator_ajuste_odds * 0.5);
      
      return {
        ...resultado,
        odds: parseFloat(novaOdds.toFixed(2))
      };
    });
  },

  /**
   * Calcula o limite máximo de aposta baseado no tipo de bilhete e prazo dos jogos
   * @param {Array} selecoes - Lista de seleções no bilhete
   * @returns {Object} - Limite e tipo
   */
  calcularLimiteDinamico: (selecoes) => {
    const LIMITE_PADRAO = 10000;
    const LIMITE_MEDIO_PRAZO = 20000;
    const LIMITE_LONGO_PRAZO = 50000;

    // Se não houver seleções ou for aposta simples
    if (!selecoes || selecoes.length <= 1) {
      return {
        limite: LIMITE_PADRAO,
        tipo: "simples"
      };
    }

    // Para múltiplas com 2-4 jogos
    if (selecoes.length < 5) {
      return {
        limite: LIMITE_PADRAO,
        tipo: "multipla_pequena"
      };
    }

    // Para múltiplas com 5+ jogos, verificar prazos
    const hoje = new Date();
    const prazosJogos = selecoes.map(selecao => {
      const dataJogo = new Date(selecao.data);
      return Math.ceil((dataJogo - hoje) / (1000 * 60 * 60 * 24)); // Diferença em dias
    });

    const maiorPrazo = Math.max(...prazosJogos);

    if (maiorPrazo <= 7) {
      return {
        limite: LIMITE_PADRAO,
        tipo: "multipla_curto_prazo"
      };
    } else if (maiorPrazo <= 15) {
      return {
        limite: LIMITE_MEDIO_PRAZO,
        tipo: "multipla_medio_prazo"
      };
    } else {
      return {
        limite: LIMITE_LONGO_PRAZO,
        tipo: "multipla_longo_prazo"
      };
    }
  }
};

export default GerenciadorRisco;
