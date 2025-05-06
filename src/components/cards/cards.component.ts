import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundanalisticsService } from '../../services/RoundAnalytics/roundanalistics.service';

@Component({
  selector: 'Cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CardsComponent  {

  constructor() {}
  @Input() cards: any[] = [];
 
}
