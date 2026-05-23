'use client';

import Header from '../../components/Header';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { CircularProgress } from '../../components/relatorios/CircularProgress';

export default function RelatoriosPage() {
  // Dados mockados (depois virão da API)
  const receitaMensal = [
    { mes: 'Janeiro', valor: 8500, max: 12000 },
    { mes: 'Dezembro', valor: 12000, max: 12000 },
    { mes: 'Novembro', valor: 9200, max: 12000 },
    { mes: 'Outubro', valor: 7800, max: 12000 },
    { mes: 'Setembro', valor: 10500, max: 12000 },
    { mes: 'Agosto', valor: 6900, max: 12000 },
  ];

  const tiposSessao = [
    { tipo: 'Casamento', quantidade: 8, total: 15, cor: 'bg-pink-500' },
    { tipo: 'Ensaio Família', quantidade: 15, total: 15, cor: 'bg-blue-500' },
    { tipo: 'Gestante', quantidade: 12, total: 15, cor: 'bg-purple-500' },
    { tipo: 'Aniversário', quantidade: 10, total: 15, cor: 'bg-green-500' },
    { tipo: 'Pré-Wedding', quantidade: 7, total: 15, cor: 'bg-yellow-500' },
  ];

  const metodosPagamento = [
    { metodo: 'Pix', porcentagem: 45, cor: 'bg-teal-500' },
    { metodo: 'Cartão de Crédito', porcentagem: 35, cor: 'bg-blue-500' },
    { metodo: 'Boleto', porcentagem: 15, cor: 'bg-orange-500' },
    { metodo: 'Dinheiro', porcentagem: 5, cor: 'bg-green-500' },
  ];

  const taxaConversao = 75; // 75% dos orçamentos viraram sessões

  const totalReceitaAno = receitaMensal.reduce((acc, curr) => acc + curr.valor, 0);
  const mediaMensal = totalReceitaAno / receitaMensal.length;

  const formatarValor = (valor: number): string => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      <Header title="Relatórios" />
      <div className="p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
            <p className="text-gray-600 mt-1">Análise de desempenho e métricas</p>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <p className="text-sm text-purple-700">Média Mensal</p>
            <p className="text-xl font-bold text-purple-900">{formatarValor(mediaMensal)}</p>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Receita Mensal */}
          <Card title="Receita Mensal">
            <div className="space-y-4">
              {receitaMensal.map((item, index) => (
                <ProgressBar
                  key={index}
                  label={item.mes}
                  value={item.valor}
                  maxValue={item.max}
                  color="bg-gradient-to-r from-purple-500 to-purple-600"
                />
              ))}
            </div>
          </Card>

          {/* Tipos de Sessão */}
          <Card title="Tipos de Sessão">
            <div className="space-y-3">
              {tiposSessao.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.cor} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.tipo}</span>
                      <span className="font-medium text-gray-800">{item.quantidade} sessões</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.cor} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(item.quantidade / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Taxa de Conversão */}
          <Card title="Taxa de Conversão">
            <div className="flex justify-center py-4">
              <CircularProgress 
                percentage={taxaConversao}
                label="Orçamentos convertidos em sessões"
              />
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700 text-center">
                De cada <span className="font-bold text-purple-700">100 orçamentos</span>, você fecha{' '}
                <span className="font-bold text-purple-700">{taxaConversao} sessões</span>
              </p>
            </div>
          </Card>

          {/* Métodos de Pagamento */}
          <Card title="Métodos de Pagamento">
            <div className="space-y-4">
              {metodosPagamento.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.cor} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.metodo}</span>
                      <span className="font-medium text-gray-800">{item.porcentagem}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.cor} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.porcentagem}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                💡 <span className="font-medium">Pix</span> é o método mais popular entre seus clientes
              </p>
            </div>
          </Card>
        </div>

        {/* Cards de Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <p className="text-blue-100 text-sm mb-2">Sessão Mais Popular</p>
            <p className="text-2xl font-bold">Ensaio Família</p>
            <p className="text-blue-100 text-sm mt-2">15 sessões este ano</p>
          </div>
          
          <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <p className="text-green-100 text-sm mb-2">Melhor Mês</p>
            <p className="text-2xl font-bold">Dezembro</p>
            <p className="text-green-100 text-sm mt-2">{formatarValor(12000)} em receita</p>
          </div>
          
          <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <p className="text-purple-100 text-sm mb-2">Total no Semestre</p>
            <p className="text-2xl font-bold">{formatarValor(totalReceitaAno)}</p>
            <p className="text-purple-100 text-sm mt-2">Últimos 6 meses</p>
          </div>
        </div>
      </div>
    </>
  );
}