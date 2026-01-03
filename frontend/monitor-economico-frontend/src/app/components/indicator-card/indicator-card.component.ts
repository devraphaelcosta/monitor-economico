import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-indicator-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicator-card.component.html',
  styleUrls: ['./indicator-card.component.scss'],
})
export class IndicatorCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() cssClass!: string;
  @Input() icon!: string;
  @Input() updatedAt?: string;
  @Input() trend?: string;

}