import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  
  //#region 
  orders:any = [];
  constructor(
    private order:OrderService
  ){}

  ngOnInit(){
    this.getOrders()
  }

  getOrders(){
    this.order.getAllOrdersByCustomerId().subscribe((res:any)=>{
      console.log("orders response", res.data.orders);
      // this.orders = res.data.orders
      this.orders=res.data.orders.sort((a:any,b:any)=>{
        if(a.createdAt < b.createdAt){
          return 1
        }else if(a.createdAt > b.createdAt){
          return -1
        }else{
          return 0
        }
      })
    })
  }

  
}
