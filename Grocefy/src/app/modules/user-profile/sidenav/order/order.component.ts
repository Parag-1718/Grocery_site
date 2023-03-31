import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {


  orders = [
    {
      id: 1,
      customerName: 'Ram Parmar',
      orderDate: new Date(2023, 2, 31),
      items: [
        { name: 'Product A', quantity: 2 },
        { name: 'Product B', quantity: 1 },
        { name: 'Product C', quantity: 3 }
      ],
      totalPrice: 100.0
    },
    {
      id: 2,
      customerName: 'Shiv Solanki',
      orderDate: new Date(2023, 2, 30),
      items: [
        { name: 'Product D', quantity: 1 },
        { name: 'Product E', quantity: 4 }
      ],
      totalPrice: 50.0
    },
    {
      id: 3,
      customerName: 'Vishnu Yadav',
      orderDate: new Date(2023, 2, 29),
      items: [
        { name: 'Product F', quantity: 3 },
        { name: 'Product G', quantity: 2 },
        { name: 'Product H', quantity: 1 }
      ],
      totalPrice: 75.0
    }
  ];
  
}
