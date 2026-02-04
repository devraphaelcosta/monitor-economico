import { Injectable } from '@angular/core';

export interface Usuario {
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: Usuario | null = null;

  login(usuario: Usuario) {
    this.usuario = usuario;
  }

  logout() {
    this.usuario = null;
  }

  getUsuario(): Usuario | null {
    return this.usuario;
  }

  isLogado(): boolean {
    return this.usuario !== null;
  }
}