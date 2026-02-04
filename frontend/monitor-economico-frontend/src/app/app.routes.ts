import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SimuladorComponent } from './pages/simulador/simulador.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'painel', component: DashboardComponent },
  { path: 'simulador', component: SimuladorComponent },
];