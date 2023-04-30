import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { addProduct, cart } from 'src/app/shared/data-type';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent {
  //#region
  cartData!:any;
  productQuantity!:number;
  totalPrice:any;
  subtotal!:number;
  text!:number;
  discount!:number;
  delivery!:number;
  dispalyEmplty = true
  displayTotal:EventEmitter<any> = new EventEmitter<any>()
  constructor(private product: ProductService, private cart:CartService, private router:Router) {}

  ngOnInit() {
    this.getCartData();
    
    window.scroll(0,0)

  }
  getCartData() {
    this.cartData = this.cart.getCartData();
    let amount = 0

    console.log(this.cartData);
      this.cartData.forEach((item:any)=>{
        if(item.quantity){
          amount = amount + (item.amount * item.quantity)
        }
      })
      this.subtotal = amount;
      if(this.subtotal){
        this.dispalyEmplty = false
      }
      else{
        this.dispalyEmplty = true
      }
      this.text = ((amount*18)/100);
      this.discount = ((amount*10)/100);
      this.delivery = 100;
      this.totalPrice = amount + ((amount*18)/100) + ((amount*10)/100) + 100;
      this.displayTotal.emit(this.totalPrice)
    };


    quantity(data: string,product:addProduct) {
      if(product.quantity){
        this.productQuantity = product.quantity
      }
      if (data === 'min' && this.productQuantity > 1) {
        this.productQuantity -= 1;
        if(product){
          product.quantity = this.productQuantity
          this.cart.addItemToCart(product)
          this.getCartData();
        }
      }
      if (data === 'pluse' && this.productQuantity < 50) {
        this.productQuantity += 1;
        if(product){
          product.quantity = this.productQuantity
          this.cart.addItemToCart(product)
          this.getCartData();
        }
      }
    }

    removeItem(product:addProduct){

      const confirmBox = new ConfirmBoxInitializer();
      confirmBox.setTitle('Are you sure?');
      confirmBox.setMessage('Do you want to Delete?');
      confirmBox.setButtonLabels('DELETE', 'NO');
    
      // Choose layout color type
      confirmBox.setConfig({
        layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
      });
    
      // Simply open the popup and listen which button is clicked
      confirmBox.openConfirmBox$().subscribe((resp:any) => {
        // IConfirmBoxPublicResponse
        console.log('Clicked button response: ', resp);
    
        if(resp.success){

      this.cart.removeItemToCart(product);
      this.getCartData();
        }
    })
  }
    storeAmout(){
      const summary = {
        sub_total: this.subtotal,
        tax_amount: this.text,
        discount_amount: this.discount,
        total_amount: this.totalPrice,
      }
      // console.log(summary);
      localStorage.setItem("summary",JSON.stringify(summary))
      this.router.navigate(["/module/cart/checkout"])
    }
  }
  



  // delCartData(id:number) {
  //   this.cart.removeCart(id)
  //   this.getCartData();
    
  // }

  // products: any = [];

  // addQuantity(Id: any, i: any) {
  //   this.cartData.forEach((item: { id: any; product_quan: number }) => {
  //     if (item.id === Id) {
  //       item.product_quan++;
  //       // console.log(item.product_quan)
  //       // console.log(this.cartData)
  //       // console.log(this.cartData[i].product_quan, 'quant');
  //       this.products = this.cartData[i];
  //       this.products.quantity = item.product_quan;
  //       this.updateCartData(Id, this.products);
  //       this.getCartData();
  //     }
  //   });
  // }

  // subQuantity(Id: any, i: any) {
  //   this.cartData.forEach((item: { id: any; product_quan: number }) => {
  //     if (item.id === Id) {
  //       if (item.product_quan > 0) {
  //         item.product_quan--;
  //         this.products = this.cartData[i];
  //         this.products.quantity = item.product_quan;
  //         this.updateCartData(Id, this.products);
  //         this.getCartData();
  //       }
  //     }
  //   });
  // }

  // updateCartData(id: any, products: cart) {
  //   this.cart.updateCart(id, products).subscribe((res) => {
  //     // console.log(res);
  //   });
  // }

  // total() {
  //   this.cart.GetCart().subscribe((res)=>{
  //     // console.log(res);
  //     this.cartData = res;
  //   })
  // }

// subQuantity(Id: any,i:any) {
//   this.cartData.forEach((item: { id: any; product_quan: number; }) => {
//     if (item.id === Id) {
//       if (item.product_quan > 0){
//       item.product_quan--;
//       this.products=this.cartData[i]
//       this.products.product_quan=item.product_quan

//       this.updateCartData(Id,this.products)

//     }
//   }
//   });
// }
