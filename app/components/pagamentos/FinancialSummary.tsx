import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface FinancialSummaryProps {
  totalRecebido: number;
  aReceber: number;
  atrasados: number;
}

export function FinancialSummary({ totalRecebido, aReceber, atrasados }: FinancialSummaryProps) {
  const formatarValor = (valor: number): string => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Recebido (Mês)</p>
            <p className="text-3xl font-bold text-green-600">{formatarValor(totalRecebido)}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <TrendingUp className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-1">A Receber</p>
            <p className="text-3xl font-bold text-yellow-600">{formatarValor(aReceber)}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <DollarSign className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-1">Atrasados</p>
            <p className="text-3xl font-bold text-red-600">{formatarValor(atrasados)}</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}