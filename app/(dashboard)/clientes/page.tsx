'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  sessoes: number;
  status: 'ativo' | 'inativo';
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados (depois virão da API)
  const clientes: Cliente[] = [
    { id: '1', nome: 'Maria Silva', telefone: '(11) 98765-4321', email: 'maria@email.com', sessoes: 3, status: 'ativo' },
    { id: '2', nome: 'João Santos', telefone: '(11) 91234-5678', email: 'joao@email.com', sessoes: 1, status: 'ativo' },
    { id: '3', nome: 'Ana Costa', telefone: '(11) 99876-5432', email: 'ana@email.com', sessoes: 5, status: 'ativo' },
    { id: '4', nome: 'Pedro Alves', telefone: '(11) 97654-3210', email: 'pedro@email.com', sessoes: 2, status: 'inativo' },
    { id: '5', nome: 'Carla Lima', telefone: '(11) 96543-2109', email: 'carla@email.com', sessoes: 4, status: 'ativo' },
  ];

  // Filtrar clientes baseado na busca
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  const handleNovoCliente = () => {
    // Implementar modal depois
    alert('Modal de novo cliente - implementar na próxima etapa');
  };

  const handleVisualizar = (id: string) => {
    alert(`Visualizar cliente ID: ${id}`);
  };

  const handleEditar = (id: string) => {
    alert(`Editar cliente ID: ${id}`);
  };

  const handleExcluir = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      alert(`Excluir cliente ID: ${id}`);
    }
  };

  return (
    <>
      <Header title="Clientes" />
      <div className="p-6 space-y-6">
        {/* Cabeçalho com busca */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Gerenciar Clientes</h1>
          <Button onClick={handleNovoCliente} icon={Plus}>
            Novo Cliente
          </Button>
        </div>

        {/* Barra de busca e filtros */}
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Buscar clientes por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          <Button variant="secondary" icon={Filter}>
            Filtros
          </Button>
        </div>

        {/* Contador de resultados */}
        <div className="text-sm text-gray-600">
          Mostrando <span className="font-semibold">{clientesFiltrados.length}</span> de <span className="font-semibold">{clientes.length}</span> clientes
        </div>

        {/* Tabela de clientes */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessões</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clientesFiltrados.length > 0 ? (
                  clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{cliente.telefone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{cliente.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{cliente.sessoes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          cliente.status === 'ativo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleVisualizar(cliente.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Visualizar"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleEditar(cliente.id)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleExcluir(cliente.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}