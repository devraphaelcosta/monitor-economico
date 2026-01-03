import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SelicResponse {
  valor: string;
  data: string;
}

export interface CambioResponse {
  valor: string;
  data: string;
}

export interface IpcaResponse {
  valor: string;
  periodo: string;
}

export interface PibResponse {
  valor: string;
  periodo: string;
}

@Injectable({
  providedIn: 'root',
})
export class IndicadoresService {
  private readonly apiUrl = 'http://localhost:3000/indicadores';

  constructor(private http: HttpClient) {}

  obterSelic(): Observable<SelicResponse> {
    return this.http.get<SelicResponse>(`${this.apiUrl}/selic`);
  }

  obterCambio(): Observable<CambioResponse> {
    return this.http.get<CambioResponse>(`${this.apiUrl}/cambio`);
  }

  obterIpca(): Observable<IpcaResponse> {
  return this.http.get<IpcaResponse>(`${this.apiUrl}/ipca`);
  }

obterPib(): Observable<PibResponse> {
  return this.http.get<PibResponse>(`${this.apiUrl}/pib`);
  }

obterHistoricoSelic(): Observable<{ data: string; valor: number }[]> {
  return this.http.get<{ data: string; valor: number }[]>(
    `${this.apiUrl}/selic/historico`);
}
obterHistoricoIpca(): Observable<{ data: string; valor: number }[]> {
  return this.http.get<{ data: string; valor: number }[]>(
    `${this.apiUrl}/ipca/historico`);
}

obterHistoricoCambio(): Observable<{ data: string; valor: number }[]> {
  return this.http.get<{ data: string; valor: number }[]>(
    `${this.apiUrl}/cambio/historico`);
}
obterHistoricoPib(): Observable<{ data: string; valor: number }[]> {
  return this.http.get<{ data: string; valor: number }[]>(
    `${this.apiUrl}/pib/historico`);
}
}