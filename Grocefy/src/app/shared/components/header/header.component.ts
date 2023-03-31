import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //#region 
  menuType = 'deafult'
  userName:string = 'Guest'
  cartItems = 0
  //#endregion

  constructor( private router:Router, private product:ProductService, private cart:CartService, private user:UserService){}

  ngOnInit(){

   this.getCartItemsLength();

    this.router.events.subscribe((res:any)=>{
      if(res.url){
        if(localStorage.getItem('user')){
          this.menuType = 'user'
          this.showUserName();
        }
        else{
          this.menuType = 'deafult'
        }
      }
    })
  }

  showUserName(){
    if(localStorage.getItem('user')){
       let userStore = localStorage.getItem('user')
       let userData = userStore && JSON.parse(userStore)[0]
       this.userName = userData.name
      //  this.productService.getCartData(userData.id)
       console.log(this.userName);
    }
   }

   logout(){
    localStorage.removeItem('user')
    this.menuType = 'deafult'
   }

  getCartItemsLength(){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.cart.getCartLength.subscribe(res=>{
      this.cartItems = res.length
    })
  }
}
