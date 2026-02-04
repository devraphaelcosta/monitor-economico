import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from '../../shared/home-header/home-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}