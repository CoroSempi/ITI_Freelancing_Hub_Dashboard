import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'Cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
})
export class CardsComponent {
  constructor(private currencyPipe: CurrencyPipe) {}
  @Input() cards: any[] = [];

  getFormattedValue(card: any): string | null {
    if (card.iconPath.includes('Earningseg')) {
      if (card.iconPath === 'Total Earningseg.svg') {
        return this.currencyPipe.transform(card.value * 50, 'EGP', '');
      } else {
        return this.currencyPipe.transform(card.value, 'USD', '');
      }
    }
    return card.value;
  }
}
