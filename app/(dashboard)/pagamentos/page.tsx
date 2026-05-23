'use client';

import { useState, useMemo } from 'react';
import Header from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { FinancialSummary } from '../../components/pagamentos/FinancialSummary';
import { Plus, DollarSign, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { PagamentoDetalhado } from '../../types';

type FiltroStatus = 'todos' | 'pago' | 'pendente' | 'atrasado';

export default function PagamentosPage() {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todos');

  // Dados mockados (depois virão da API)
  const pagamentos: PagamentoDetalhado[] = [
    {
      id: '1',
      sessaoId: '1',
      clienteId: '1',
      clienteNome: 'Pedro Alves',
      sessaoTipo: 'Ensaio Família',
      valor: 850,
      dataPagamento: '2026-06-02',
      dataVencimento: '2026-06-02',
      metodoPagamento: 'pix',
      status: 'pago'
    },
    {
      id: '2',
      sessaoId: '2',
      clienteId: '2',
      clienteNome: 'Carla Lima',
      sessaoTipo: 'Casamento',
      valor: 1200,
      dataPagamento: '2026-05-28',
      dataVencimento: '2026-05-28',
      metodoPagamento: 'cartao',
      status: 'pago',
      numeroParcela: '1/3'
    },
    {
      id: '3',
      sessaoId: '3',
      clienteId: '3',
      clienteNome: 'Lucas Rocha',
      sessaoTipo: 'Gestante',
      valor: 600,
      dataPagamento: null,
      dataVencimento: '2026-06-10',
      metodoPagamento: 'boleto',
      status: 'pendente'
    },
    {
      id: '4',
      sessaoId: '4',
      clienteId: '4',
      clienteNome: 'Fernanda Dias',
      sessaoTipo: 'Aniversário',
      valor: 450,
      dataPagamento: null,
      dataVencimento: '2026-05-20',
      metodoPagamento: 'pix',
      status: 'atrasado'
    },
    {
      id: '5',
      sessaoId: '5',
      clienteId: '5',
      clienteNome: 'Roberto Silva',
      sessaoTipo: 'Casamento',
      valor: 2500,
      dataPagamento: '2026-06-01',
      dataVencimento: '2026-06-01',
      metodoPagamento: 'transferencia',
      status: 'pago'
    },
    {
      id: '6',
      sessaoId: '6',
      clienteId: '6',
      clienteNome: 'Juliana Costa',
      sessaoTipo: 'Pré-Wedding',
      valor: 1100,
      dataPagamento: null,
      dataVencimento: '2026-06-15',
      metodoPagamento: 'pix',
      status: 'pendente'
    },
    {
      id: '7',
      sessaoId: '2',
      clienteId: '2',
      clienteNome: 'Carla Lima',
      sessaoTipo: 'Casamento',
      valor: 1200,
      dataPagamento: null,
      dataVencimento: '2026-06-28',
      metodoPagamento: 'cartao',
      status: 'pendente',
      numeroParcela: '2/3'
    },
  ];

  // Calcular resumo financeiro
  const resumo = useMemo(() => {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    let totalRecebido = 0;
    let aReceber = 0;
    let atrasados = 0;

    pagamentos.forEach(p => {
      if (p.status === 'pago' && p.dataPagamento) {
        const dataPagamento = new Date(p.dataPagamento);
        if (dataPagamento.getMonth() === mesAtual && dataPagamento.getFullYear() === anoAtual) {
          totalRecebido += p.valor;
        }
      } else if (p.status === 'pendente') {
        aReceber += p.valor;
      } else if (p.status === 'atrasado') {
        atrasados += p.valor;
      }
    });

    return { totalRecebido, aReceber, atrasados };
  }, [pagamentos]);

  // Filtrar pagamentos
  const pagamentosFiltrados = useMemo(() => {
    if (filtroStatus === 'todos') return pagamentos;
    return pagamentos.filter(p => p.status === filtroStatus);
  }, [pagamentos, filtroStatus]);

  const formatarData = (dataStr: string): string => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarValor = (valor: number): string => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarMetodo = (metodo: string): string => {
    const metodos: Record<string, string> = {
      'pix': 'Pix',
      'cartao': 'Cartão',
      'boleto': 'Boleto',
      'dinheiro': 'Dinheiro',
      'transferencia': 'Transferência'
    };
    return metodos[metodo] || metodo;
  };

  const handleRegistrarPagamento = () => {
    alert('Modal de registrar pagamento - implementar depois');
  };

  const handleVisualizarPagamento = (id: string) => {
    alert(`Visualizar pagamento ID: ${id}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'atrasado':
        return <XCircle className="text-red-600" size={24} />;
      default:
        return <Clock className="text-yellow-600" size={24} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-700';
      case 'atrasado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pago':
        return 'Pago';
      case 'atrasado':
        return 'Atrasado';
      default:
        return 'Pendente';
    }
  };

  return (
    <>
      <Header title="Pagamentos" />
      <div className="p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Controle de Pagamentos</h1>
          <Button onClick={handleRegistrarPagamento} icon={Plus}>
            Registrar Pagamento
          </Button>
        </div>

        {/* Resumo Financeiro */}
        <FinancialSummary 
          totalRecebido={resumo.totalRecebido}
          aReceber={resumo.aReceber}
          atrasados={resumo.atrasados}
        />

        {/* Histórico de Pagamentos */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Histórico de Pagamentos</h3>
            
            {/* Filtro de Status */}
            <select 
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as FiltroStatus)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="todos">Todos</option>
              <option value="pago">Pagos</option>
              <option value="pendente">Pendentes</option>
              <option value="atrasado">Atrasados</option>
            </select>
          </div>

          {/* Contador de resultados */}
          <div className="text-sm text-gray-600 mb-4">
            Mostrando <span className="font-semibold">{pagamentosFiltrados.length}</span> de <span className="font-semibold">{pagamentos.length}</span> pagamentos
          </div>

          {/* Lista de Pagamentos */}
          <div className="space-y-3">
            {pagamentosFiltrados.length > 0 ? (
              pagamentosFiltrados.map((pagamento) => (
                <div key={pagamento.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      pagamento.status === 'pago' ? 'bg-green-100' : 
                      pagamento.status === 'atrasado' ? 'bg-red-100' : 
                      'bg-yellow-100'
                    }`}>
                      {getStatusIcon(pagamento.status)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{pagamento.clienteNome}</p>
                      <p className="text-sm text-gray-600">{pagamento.sessaoTipo}</p>
                      {pagamento.numeroParcela && (
                        <p className="text-xs text-purple-600 font-medium">Parcela {pagamento.numeroParcela}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-600">
                        Vencimento: {formatarData(pagamento.dataVencimento)}
                      </p>
                      {pagamento.dataPagamento && (
                        <p className="text-xs text-green-600">
                          Pago em: {formatarData(pagamento.dataPagamento)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">{formatarMetodo(pagamento.metodoPagamento)}</p>
                    </div>
                    
                    <div className="text-left sm:text-right sm:min-w-30">
                      <p className="font-bold text-gray-800 text-lg">{formatarValor(pagamento.valor)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full inline-block ${getStatusBadge(pagamento.status)}`}>
                        {getStatusText(pagamento.status)}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleVisualizarPagamento(pagamento.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Visualizar"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-12">
                Nenhum pagamento encontrado com este filtro.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}