import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from '../Grid/index.jsx'; 
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios'); 
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Grid Component', () => {
  let users;
  let setUsers;
  let setOnEdit;

  beforeEach(() => {
    users = [
      { id: 1, nome: 'Alice', email: 'alice@example.com', numero: '123-456-7890' },
      { id: 2, nome: 'Bob', email: 'bob@example.com', numero: '098-765-4321' },
    ];
    
    setUsers = jest.fn();
    setOnEdit = jest.fn();
    
    render(<Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />);
  });

  test('deve chamar setOnEdit com o item correto ao clicar no ícone de edição', () => {
   
    const editIcon = screen.getByTestId('edit-icon-1');
    fireEvent.click(editIcon);

    expect(setOnEdit).toHaveBeenCalledWith(users[0]);
  });

  test('deve chamar handleDelete e atualizar a lista de usuários', async () => {
    axios.delete.mockResolvedValueOnce({ data: 'User deleted' }); // Simulando a resposta da API


    const deleteIcon = screen.getByTestId('delete-icon-1'); 
    fireEvent.click(deleteIcon);

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:6002/1");
    expect(setUsers).toHaveBeenCalledWith([users[1]]); // Verifica se a lista foi atualizada corretamente
    expect(toast.success).toHaveBeenCalledWith('User deleted'); // Verifica se a notificação de sucesso foi chamada
  });

  test('deve chamar toast.error ao falhar na exclusão', async () => {
    axios.delete.mockRejectedValueOnce({ data: 'Error deleting user' }); // Simulando uma falha

    // Localiza o ícone de exclusão
    const deleteIcon = screen.getByTestId('delete-icon-1'); // Ajuste se necessário
    fireEvent.click(deleteIcon);

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:6002/1");
    expect(toast.error).toHaveBeenCalledWith('Error deleting user'); // Verifica se a notificação de erro foi chamada
  });
});
