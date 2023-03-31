import { Component } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  deliveryOptions = [
    { value: 'standard', label: '28  Bhavana  Tarun Bharat Sahar Road Andheri, Mumbai,Ahmedabad,400099,India' },
    { value: 'express', label: 'Shop No 295 Gr Flr Om Niwas Lamington Road Opp Lamington Police Station Chowpatty, Mumbai,Ahmedabad,400007,India' },
    { value: 'overnight', label: '33  st Floor Prabhadevi Indl.estate Vs Marg Opp Siddhivinayak Temple Prabhadevi, Mumbai,Ahmedabad,400025,India' },
  ];
}
