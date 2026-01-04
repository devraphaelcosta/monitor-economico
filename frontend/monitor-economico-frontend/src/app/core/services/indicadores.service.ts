import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndicadoresService {

  private apiUrl = 'http://localhost:3000/indicadores';

  constructor(private http: HttpClient) {}

  /* =======================
     SELIC
  ======================= */
  obterSelic(): Observable<any> {
    return this.http.get(`${this.apiUrl}/selic`);
  }

  obterHistoricoSelic(inicio?: string, fim?: string): Observable<any[]> {
    let params = new HttpParams();

    if (inicio) params = params.set('inicio', inicio);
    if (fim) params = params.set('fim', fim);

    return this.http.get<any[]>(`${this.apiUrl}/selic/historico`, { params });
  }

  /* =======================
     IPCA
  ======================= */
  obterIpca(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ipca`);
  }

  obterHistoricoIpca(inicio?: string, fim?: string): Observable<any[]> {
    let params = new HttpParams();

    if (inicio) params = params.set('inicio', inicio);
    if (fim) params = params.set('fim', fim);

    return this.http.get<any[]>(`${this.apiUrl}/ipca/historico`, { params });
  }

  /* =======================
     PIB
  ======================= */
  obterPib(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pib`);
  }

  obterHistoricoPib(inicio?: string, fim?: string): Observable<any[]> {
    let params = new HttpParams();

    if (inicio) params = params.set('inicio', inicio);
    if (fim) params = params.set('fim', fim);

    return this.http.get<any[]>(`${this.apiUrl}/pib/historico`, { params });
  }

  /* =======================
     CÂMBIO
  ======================= */
  obterCambio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cambio`);
  }

  obterHistoricoCambio(inicio?: string, fim?: string): Observable<any[]> {
    let params = new HttpParams();

    if (inicio) params = params.set('inicio', inicio);
    if (fim) params = params.set('fim', fim);

    return this.http.get<any[]>(`${this.apiUrl}/cambio/historico`, { params });
  }
}