import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Corrigido aqui
import Table from './index.jsx';
import { FaEdit, FaTrash } from "react-icons/fa";

describe('Table Component', () => {
  const users = [
    { id: 1, nome: 'Alice', email: 'alice@example.com', numero: '123-456-7890' },
    { id: 2, nome: 'Bob', email: 'bob@example.com', numero: '098-765-4321' }
  ];

  const handleEdit = jest.fn();
  const handleDelete = jest.fn();

  test('deve renderizar as informações dos usuários corretamente', () => {
    render(<Table users={users} handleEdit={handleEdit} handleDelete={handleDelete} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('098-765-4321')).toBeInTheDocument();
  });


});