import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post<{
      token: string;
      user: { id: number; nome: string; email: string };
    }>(`${this.apiUrl}/login`, {
      email,
      password: senha
    });
  }

  cadastrar(nome: string, email: string, senha: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      nome,
      email,
      password: senha
    });
  }

  salvarSessao(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  getUsuario() {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  isLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
