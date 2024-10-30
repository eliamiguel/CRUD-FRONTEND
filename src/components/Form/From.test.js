import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../Form/index.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock da biblioteca toast para evitar notificações reais durante os testes
jest.mock('react-toastify');

describe('Form Component', () => {
  const mockGetUsers = jest.fn();
  const mockSetOnEdit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa as chamadas anteriores
  });

  test('deve renderizar os campos do formulário corretamente', () => {
    render(<Form getUsers={mockGetUsers} onEdit={null} setOnEdit={mockSetOnEdit} />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  test('deve mostrar um aviso quando campos não são preenchidos', () => {
    render(<Form getUsers={mockGetUsers} onEdit={null} setOnEdit={mockSetOnEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    
    expect(toast.warn).toHaveBeenCalledWith("Preencha todos os campos!");
  });

  test('deve chamar getUsers após o envio do formulário', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: 'Usuário criado com sucesso' });

    render(<Form getUsers={mockGetUsers} onEdit={null} setOnEdit={mockSetOnEdit} />);
    
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: '2000-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:6002/", {
      nome: 'Alice',
      email: 'alice@example.com',
      numero: '123456789',
      datadenasci: '2000-01-01',
    });

    expect(mockGetUsers).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Usuário criado com sucesso');
  });

  test('deve preencher os campos ao entrar em modo de edição', () => {
    const userToEdit = {
      id: 1,
      nome: 'Bob',
      email: 'bob@example.com',
      numero: '987654321',
      datadenasci: '1990-05-05',
    };

    render(<Form getUsers={mockGetUsers} onEdit={userToEdit} setOnEdit={mockSetOnEdit} />);

    expect(screen.getByLabelText(/nome/i).value).toBe('Bob');
    expect(screen.getByLabelText(/e-mail/i).value).toBe('bob@example.com');
    expect(screen.getByLabelText(/telefone/i).value).toBe('987654321');
    expect(screen.getByLabelText(/data de nascimento/i).value).toBe('1990-05-05');
  });

  test('deve chamar axios.put ao editar um usuário', async () => {
    const userToEdit = {
      id: 1,
      nome: 'Bob',
      email: 'bob@example.com',
      numero: '987654321',
      datadenasci: '1990-05-05',
    };

    axios.put = jest.fn().mockResolvedValue({ data: 'Usuário atualizado com sucesso' });

    render(<Form getUsers={mockGetUsers} onEdit={userToEdit} setOnEdit={mockSetOnEdit} />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Robert' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(axios.put).toHaveBeenCalledWith("http://localhost:6002/1", {
      nome: 'Robert',
      email: 'bob@example.com',
      numero: '987654321',
      datadenasci: '1990-05-05',
    });

    expect(mockGetUsers).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Usuário atualizado com sucesso');
  });
});
