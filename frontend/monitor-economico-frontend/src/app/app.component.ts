import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  currentYear = new Date().getFullYear();

  showPainelLayout = false;

  headerTitle = '';
  headerSubtitle = '';

  footerTitle = '';
  footerSubtitle = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects;

        if (url.startsWith('/painel')) {
          this.showPainelLayout = true;

          this.headerTitle = 'Painel de Monitoramento Econômico';
          this.headerSubtitle = 'Dados oficiais • Banco Central e IBGE';

          this.footerTitle = 'Monitor Econômico';
          this.footerSubtitle = 'Painel de Indicadores Macroeconômicos';

        } else {
          this.showPainelLayout = false;
        }
      });
  }
}