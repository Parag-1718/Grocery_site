import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent {

  //#region 
  orderDetails:any = [];
  constructor(private cart:CartService,
    private Encryptin:EncryptionService,
    private order:OrderService
    ){}
  ngOnInit(){

    setTimeout(() => {
      this.getOrderdetails()
    }, 1000);
    window.scroll(0,0)

    let userData = localStorage.getItem("userToken")
    let userName = userData && JSON.parse(userData).user.username;
    console.log(userName);

    localStorage.removeItem(`cart_${userName}`)
    localStorage.removeItem('summary')
    this.cart.getCartLength.emit([ ])
  }

  getOrderdetails(){
    let id = localStorage.getItem("orderId")
    let orderDetails = id ;
    console.log(orderDetails);

    this.Encryptin.encryption(orderDetails).subscribe((res:any)=>{
      console.log("res encryption...." , res.data);

      this.order.getOrderById(res.data).subscribe((orderData:any)=>{
        this.orderDetails.push(orderData.data)
        console.log("res order", this.orderDetails);

      })
    })
  }

  remove(){
    localStorage.removeItem('orderId')
  }
}
