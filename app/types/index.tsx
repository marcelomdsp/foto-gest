
export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  status: 'ativo' | 'inativo';
}

export interface Sessao {
  id: number;
  clienteId: number;
  data: string;
  horario: string;
  tipo: 'casamento' | 'familia' | 'gestante' | 'pre-wedding' | 'evento';
  valor: number;
  status: 'confirmado' | 'pendente' | 'cancelado';
}

export interface Pagamento {
  id: number;
  sessaoId: number;
  clienteNome: string;
  valor: number;
  dataPagamento: string | null;
  dataVencimento: string;
  metodo: 'cartao' | 'pix' | 'dinheiro';
  status: 'pago' | 'pendente' | 'cancelado' | 'atrasado';
}

export interface MenuItemType {
id: string;
label: string;
icon: any; // Lucide icon component
href: string;
}

// ... tipos existentes ...

export interface Agendamento {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: string; // formato: YYYY-MM-DD
  hora: string; // formato: HH:MM
  tipo: 'casamento' | 'ensaio-familia' | 'gestante' | 'aniversario' | 'pre-wedding' | 'outros';
  valor: number;
  status: 'confirmado' | 'pendente' | 'cancelado';
  observacoes?: string;
}

export interface DiaCalendario {
  dia: number;
  mes: number;
  ano: number;
  temSessao: boolean;
  quantidadeSessoes: number;
}

// ... tipos existentes ...

export interface PagamentoDetalhado {
  id: string;
  sessaoId: string;
  clienteId: string;
  clienteNome: string;
  sessaoTipo: string;
  valor: number;
  dataPagamento: string | null; // null = não pago ainda
  dataVencimento: string;
  metodoPagamento: 'pix' | 'cartao' | 'boleto' | 'dinheiro' | 'transferencia';
  status: 'pago' | 'pendente' | 'atrasado';
  numeroParcela?: string; // Ex: "1/3"
  observacoes?: string;
}

export interface ResumoFinanceiro {
  totalRecebido: number;
  aReceber: number;
  atrasados: number;
  recebidoMes: number;
}