import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-user-access',
  standalone: true,
  imports: [CommonModule, AuthModalComponent],
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.scss'
})
export class UserAccessComponent {

  modalAberto = false;

  constructor(public auth: AuthService) {}

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  logout() {
    this.auth.logout();
  }
}
