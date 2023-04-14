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

    let userData = localStorage.getItem("userToken")
    let userName = userData && JSON.parse(userData).user.username;
    console.log(userName);
    
    let cartdata = localStorage.getItem(`cart_${userName}`)
    let userCart = cartdata && JSON.parse(cartdata);
    if (!userCart) {
      return [];
    }
    return userCart || [];
  }

  addItemToCart(item:any){
    // debugger
    let userData = localStorage.getItem("userToken")
    let userName = userData && JSON.parse(userData).user.username;
    console.log(userName);

    // Check if cart exists for user
    let user = localStorage.getItem(`cart_${userName}`)
    let userCart = user && JSON.parse(user);
    if (!userCart) {
      userCart = [];
    }

    // Add item to cart
    
    userCart = this.getCartData();
    let currentProduct = userCart.find((product:any) => product.id === item.id);
    if(currentProduct){
      currentProduct.quantity = item.quantity
    }
    else{
      userCart.push(item)
    }

    console.log(userCart);

    localStorage.setItem(`cart_${userName}`, JSON.stringify(userCart));
    // localStorage.setItem('localCart',JSON.stringify(userCart));
    this.getCartLength.emit(userCart)
  }

  removeItemToCart(item:any){
    let userCart = this.getCartData();

    let userData = localStorage.getItem("userToken")
    let userName = userData && JSON.parse(userData).user.username;
    console.log(userName);

    let indexOfItem = userCart.findIndex((product:any) => product.id === item.id);
    if(indexOfItem != -1){
      userCart.splice(indexOfItem,1)
    }
    localStorage.setItem(`cart_${userName}`, JSON.stringify(userCart));
    this.getCartLength.emit(userCart)
  }

  
  
}
