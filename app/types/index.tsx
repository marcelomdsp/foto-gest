
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