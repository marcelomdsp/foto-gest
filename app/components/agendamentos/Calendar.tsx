'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  sessoesPorDia: Map<string, number>; // key: YYYY-MM-DD, value: quantidade
}

export function Calendar({ selectedDate, onDateChange, sessoesPorDia }: CalendarProps) {
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const primeiroDiaMes = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const ultimoDiaMes = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const primeiroDiaSemana = primeiroDiaMes.getDay();
  const diasNoMes = ultimoDiaMes.getDate();

  const mesAnterior = () => {
    const novaData = new Date(selectedDate);
    novaData.setMonth(novaData.getMonth() - 1);
    onDateChange(novaData);
  };

  const proximoMes = () => {
    const novaData = new Date(selectedDate);
    novaData.setMonth(novaData.getMonth() + 1);
    onDateChange(novaData);
  };

  const selecionarDia = (dia: number) => {
    const novaData = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dia);
    onDateChange(novaData);
  };

  const formatarDataKey = (ano: number, mes: number, dia: number): string => {
    return `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  };

  const hoje = new Date();
  const isHoje = (dia: number) => {
    return dia === hoje.getDate() && 
           selectedDate.getMonth() === hoje.getMonth() && 
           selectedDate.getFullYear() === hoje.getFullYear();
  };

  const isSelecionado = (dia: number) => {
    return dia === selectedDate.getDate();
  };

  // Gerar dias do calendário
  const dias = [];
  
  // Dias vazios antes do primeiro dia do mês
  for (let i = 0; i < primeiroDiaSemana; i++) {
    dias.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Dias do mês
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataKey = formatarDataKey(selectedDate.getFullYear(), selectedDate.getMonth(), dia);
    const quantidadeSessoes = sessoesPorDia.get(dataKey) || 0;
    const temSessao = quantidadeSessoes > 0;

    dias.push(
      <button
        key={dia}
        onClick={() => selecionarDia(dia)}
        className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors relative
          ${isSelecionado(dia) ? 'bg-purple-600 text-white font-bold' : ''}
          ${!isSelecionado(dia) && isHoje(dia) ? 'bg-purple-100 text-purple-700 font-bold' : ''}
          ${!isSelecionado(dia) && !isHoje(dia) && temSessao ? 'bg-purple-50 text-purple-700 font-semibold hover:bg-purple-100' : ''}
          ${!isSelecionado(dia) && !isHoje(dia) && !temSessao ? 'hover:bg-gray-100' : ''}
        `}
      >
        <span>{dia}</span>
        {temSessao && !isSelecionado(dia) && (
          <span className="absolute bottom-1 w-1 h-1 bg-purple-600 rounded-full" />
        )}
        {temSessao && quantidadeSessoes > 1 && (
          <span className="absolute top-1 right-1 text-[10px] bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
            {quantidadeSessoes}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={mesAnterior}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          {meses[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h3>
        <button 
          onClick={proximoMes}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {diasSemana.map(dia => (
          <div key={dia} className="text-center text-sm font-medium text-gray-600 py-2">
            {dia}
          </div>
        ))}
      </div>

      {/* Grade de dias */}
      <div className="grid grid-cols-7 gap-2">
        {dias}
      </div>

      {/* Legenda */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-100 rounded border border-purple-300" />
          <span>Hoje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-50 rounded border border-purple-200" />
          <span>Com sessões</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded" />
          <span>Selecionado</span>
        </div>
      </div>
    </div>
  );
}