import React from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/Card';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Users, Calendar, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  // Dados mockados (depois virão do backend)
  const stats = [
    { title: 'Total Clientes', value: 48, icon: Users, bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600', textColor: 'text-blue-100' },
    { title: 'Sessões Mês', value: 12, icon: Calendar, bgColor: 'bg-gradient-to-br from-green-500 to-green-600', textColor: 'text-green-100' },
    { title: 'Receita Mês', value: 'R$ 8.5k', icon: DollarSign, bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600', textColor: 'text-purple-100' },
    { title: 'Pendentes', value: 5, icon: AlertCircle, bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600', textColor: 'text-orange-100' },
  ];

  const proximasSessoes = [
    { cliente: 'Maria Silva', data: '05/01/2026', tipo: 'Ensaio Família', status: 'confirmado' },
    { cliente: 'João Santos', data: '08/01/2026', tipo: 'Casamento', status: 'confirmado' },
    { cliente: 'Ana Costa', data: '12/01/2026', tipo: 'Gestante', status: 'pendente' },
  ];

  const pagamentosRecentes = [
    { cliente: 'Pedro Alves', valor: 'R$ 850,00', data: '02/01/2026', status: 'pago' },
    { cliente: 'Carla Lima', valor: 'R$ 1.200,00', data: '28/12/2025', status: 'pago' },
    { cliente: 'Lucas Rocha', valor: 'R$ 600,00', data: '25/12/2025', status: 'pendente' },
  ];

  return (
    <>
      <Header title="Dashboard" />
      <div className=" mt-18 p-6 space-y-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Próximas Sessões e Pagamentos Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Próximas Sessões */}
          <Card title="Próximas Sessões">
            <div className="space-y-3">
              {proximasSessoes.map((sessao, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{sessao.cliente}</p>
                    <p className="text-sm text-gray-500">{sessao.tipo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{sessao.data}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      sessao.status === 'confirmado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sessao.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pagamentos Recentes */}
          <Card title="Pagamentos Recentes">
            <div className="space-y-3">
              {pagamentosRecentes.map((pagamento, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{pagamento.cliente}</p>
                    <p className="text-sm text-gray-500">{pagamento.data}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{pagamento.valor}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pagamento.status === 'pago' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {pagamento.status === 'pago' ? 'Pago' : 'Pendente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}