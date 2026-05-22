'use client';

import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { Calendar } from '../../components/agendamentos/Calendar';
import { Plus, CheckCircle, Clock, Calendar as CalendarIcon, Eye, Edit } from 'lucide-react';
import { Agendamento } from '../../types';

export default function AgendamentosPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Dados mockados (depois virão da API)
  const agendamentos: Agendamento[] = [
    { 
      id: '1', 
      clienteId: '1', 
      clienteNome: 'Maria Silva', 
      data: '2026-06-05', 
      hora: '09:00', 
      tipo: 'ensaio-familia', 
      valor: 850, 
      status: 'confirmado' 
    },
    { 
      id: '2', 
      clienteId: '2', 
      clienteNome: 'João Santos', 
      data: '2026-06-05', 
      hora: '14:00', 
      tipo: 'gestante', 
      valor: 600, 
      status: 'confirmado' 
    },
    { 
      id: '3', 
      clienteId: '3', 
      clienteNome: 'Ana Costa', 
      data: '2026-06-08', 
      hora: '10:00', 
      tipo: 'casamento', 
      valor: 2500, 
      status: 'confirmado' 
    },
    { 
      id: '4', 
      clienteId: '4', 
      clienteNome: 'Pedro Alves', 
      data: '2026-06-12', 
      hora: '15:00', 
      tipo: 'aniversario', 
      valor: 450, 
      status: 'pendente' 
    },
    { 
      id: '5', 
      clienteId: '5', 
      clienteNome: 'Carla Lima', 
      data: '2026-06-15', 
      hora: '11:00', 
      tipo: 'pre-wedding', 
      valor: 1200, 
      status: 'confirmado' 
    },
  ];

  // Mapear quantidade de sessões por dia
  const sessoesPorDia = useMemo(() => {
    const map = new Map<string, number>();
    agendamentos.forEach(agendamento => {
      const count = map.get(agendamento.data) || 0;
      map.set(agendamento.data, count + 1);
    });
    return map;
  }, [agendamentos]);

  // Filtrar sessões do dia selecionado
  const sessoesHoje = useMemo(() => {
    const dataFormatada = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return agendamentos
      .filter(a => a.data === dataFormatada)
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }, [selectedDate, agendamentos]);

  // Todas as sessões ordenadas por data
  const todasSessoes = useMemo(() => {
    return [...agendamentos].sort((a, b) => {
      const dataA = new Date(a.data + 'T' + a.hora);
      const dataB = new Date(b.data + 'T' + b.hora);
      return dataA.getTime() - dataB.getTime();
    });
  }, [agendamentos]);

  const formatarData = (dataStr: string): string => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarTipo = (tipo: string): string => {
    const tipos: Record<string, string> = {
      'casamento': 'Casamento',
      'ensaio-familia': 'Ensaio Família',
      'gestante': 'Gestante',
      'aniversario': 'Aniversário',
      'pre-wedding': 'Pré-Wedding',
      'outros': 'Outros'
    };
    return tipos[tipo] || tipo;
  };

  const formatarValor = (valor: number): string => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleNovaSessao = () => {
    alert('Modal de nova sessão - implementar depois');
  };

  const handleVisualizar = (id: string) => {
    alert(`Visualizar sessão ID: ${id}`);
  };

  const handleEditar = (id: string) => {
    alert(`Editar sessão ID: ${id}`);
  };

  return (
    <>
      <Header title="Agendamentos" />
      <div className="p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Agendamentos</h1>
          <Button onClick={handleNovaSessao} icon={Plus}>
            Nova Sessão
          </Button>
        </div>

        {/* Grid: Calendário + Sessões do Dia */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <div className="lg:col-span-2">
            <Calendar 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              sessoesPorDia={sessoesPorDia}
            />
          </div>

          {/* Sessões do Dia Selecionado */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <CalendarIcon size={20} />
              {formatarData(`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`)}
            </h3>
            
            <div className="space-y-3">
              {sessoesHoje.length > 0 ? (
                sessoesHoje.map((sessao) => (
                  <div key={sessao.id} className="p-3 bg-purple-50 border-l-4 border-purple-600 rounded">
                    <p className="text-sm font-bold text-purple-700">{sessao.hora}</p>
                    <p className="font-medium text-gray-800">{sessao.clienteNome}</p>
                    <p className="text-sm text-gray-600">{formatarTipo(sessao.tipo)}</p>
                    <p className="text-sm font-semibold text-purple-600 mt-1">
                      {formatarValor(sessao.valor)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Nenhuma sessão agendada para este dia
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lista de Todas as Sessões */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Todas as Sessões</h3>
          <div className="space-y-3">
            {todasSessoes.map((sessao) => (
              <div key={sessao.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    sessao.status === 'confirmado' ? 'bg-green-100' : 
                    sessao.status === 'pendente' ? 'bg-yellow-100' : 
                    'bg-red-100'
                  }`}>
                    {sessao.status === 'confirmado' ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : sessao.status === 'pendente' ? (
                      <Clock className="text-yellow-600" size={24} />
                    ) : (
                      <Clock className="text-red-600" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{sessao.clienteNome}</p>
                    <p className="text-sm text-gray-600">{formatarTipo(sessao.tipo)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {formatarData(sessao.data)} às {sessao.hora}
                  </p>
                  <p className="text-sm font-bold text-purple-600">
                    {formatarValor(sessao.valor)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVisualizar(sessao.id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Visualizar"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => handleEditar(sessao.id)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}