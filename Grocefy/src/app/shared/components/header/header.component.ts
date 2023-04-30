import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { MyCartComponent } from 'src/app/modules/cart/my-cart/my-cart.component';
import { ToastrService } from 'ngx-toastr';

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
  cartTotal = 0
  //#endregion

  constructor( private router:Router, private product:ProductService, private cart:CartService, private user:UserService,private toastr:ToastrService){}

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
        this.getCartItemsLength()
      }
    })
  }

  showUserName(){
    // if(localStorage.getItem('user')){
    //    let userStore = localStorage.getItem('userToken')
    //    let userData = userStore && JSON.parse(userStore)
    //    this.userName = userData.user.first_name + " " + userData.user.last_name
    //   //  this.productService.getCartData(userData.id)
    //    console.log(this.userName);
    // }

    this.user.getUserDetails().subscribe((res:any)=>{
      this.userName = res.data.first_name +" "+ res.data.last_name
    })
   }

   logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('userToken')
    localStorage.removeItem('current')
    localStorage.removeItem('orderId')
    this.menuType = 'deafult',
    this.cartItems = 0;
    this.toastr.success("Logout Successfully!!!")
   }

  getCartItemsLength(){
    let userData = localStorage.getItem("userToken")
    let userName = userData && JSON.parse(userData).user.username;
    console.log(userName);
    let cartData = localStorage.getItem(`cart_${userName}`);
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.cart.getCartLength.subscribe(res=>{
      this.cartItems = res.length
    })
    
  }
}
