import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent {

  constructor(private cart:CartService){}
  ngOnInit(){

    localStorage.removeItem('localCart')
    this.cart.getCartLength.emit([ ])
  }

}
