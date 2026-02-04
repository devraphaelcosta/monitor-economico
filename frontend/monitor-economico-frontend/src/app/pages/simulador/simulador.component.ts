import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.scss'
})
export class SimuladorComponent {

  inflacao = 'media';
  juros = 'neutros';
  pib = 'estavel';

  resultado: any = null;

  simular() {
    // Cenário contracionista
    if (this.inflacao === 'alta' && this.juros === 'altos') {
      this.resultado = {
        titulo: 'Cenário Contracionista',
        descricao:
          'Ambiente de política monetária restritiva, com inflação elevada e juros altos.',
        impactos: [
          'Crédito mais caro e restrito',
          'Redução do consumo',
          'Desaceleração do investimento produtivo'
        ]
      };
    }

    // Cenário expansionista
    else if (this.inflacao !== 'alta' && this.juros === 'baixos' && this.pib === 'crescimento') {
      this.resultado = {
        titulo: 'Cenário Expansionista',
        descricao:
          'Ambiente favorável ao crescimento econômico, com estímulo ao crédito e investimento.',
        impactos: [
          'Crédito mais acessível',
          'Aumento do consumo',
          'Estímulo ao investimento'
        ]
      };
    }

    // Cenário de atenção
    else {
      this.resultado = {
        titulo: 'Cenário de Atenção',
        descricao:
          'Cenário misto, que exige acompanhamento dos indicadores macroeconômicos.',
        impactos: [
          'Risco moderado para o crédito',
          'Decisões de investimento mais cautelosas',
          'Necessidade de monitoramento contínuo'
        ]
      };
    }
  }
}
