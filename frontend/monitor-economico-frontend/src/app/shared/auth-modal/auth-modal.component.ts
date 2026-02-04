import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {

  @Output() fecharModal = new EventEmitter<void>();

  modoCadastro = false;

  nome = '';
  email = '';
  senha = '';

  carregando = false;
  erro = '';

  constructor(private auth: AuthService) {}

  fechar() {
    this.fecharModal.emit();
  }

  submit() {
    this.erro = '';
    this.carregando = true;

    if (this.modoCadastro) {
      this.auth.cadastrar(this.nome, this.email, this.senha).subscribe({
        next: () => {
          this.modoCadastro = false;
          this.carregando = false;
          alert('Cadastro realizado! Faça login.');
        },
        error: () => {
          this.erro = 'Erro ao cadastrar usuário';
          this.carregando = false;
        }
      });

    } else {
      this.auth.login(this.email, this.senha).subscribe({
        next: (res) => {
          this.auth.salvarSessao(res.token, res.user);
          this.carregando = false;
          this.fechar();
        },
        error: () => {
          this.erro = 'Email ou senha inválidos';
          this.carregando = false;
        }
      });
    }
  }
}
