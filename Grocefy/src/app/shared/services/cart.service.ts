import { EventEmitter, Injectable } from '@angular/core';
import { addProduct } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //#region 
  getCartLength:EventEmitter<addProduct[]> = new EventEmitter<addProduct[]>
  constructor() { }

  getCartData(){
    let cartdata = localStorage.getItem('localCart')
    let localCart = cartdata && JSON.parse(cartdata);
    return localCart || [];
  }

  addItemToCart(item:any){
    let cart = this.getCartData();
    let currentProduct = cart.find((product:any) => product.id === item.id);
    if(currentProduct){
      currentProduct.quantity = item.quantity
    }
    else{
      cart.push(item)
    }
    // console.log(cart);
    localStorage.setItem('localCart',JSON.stringify(cart));
    this.getCartLength.emit(cart)
  }

  removeItemToCart(item:any){
    let cart = this.getCartData();
    let indexOfItem = cart.findIndex((product:any) => product.id === item.id);
    if(indexOfItem != -1){
      cart.splice(indexOfItem,1)
    }
    localStorage.setItem('localCart',JSON.stringify(cart)) 
    this.getCartLength.emit(cart)
  }
}
