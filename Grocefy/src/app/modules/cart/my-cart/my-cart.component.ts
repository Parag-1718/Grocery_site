import { Component, EventEmitter } from '@angular/core';
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
  constructor(private product: ProductService, private cart:CartService) {}

  ngOnInit() {
    this.getCartData();
    
    window.scroll(0,0)

  }
  getCartData() {
    this.cartData = this.cart.getCartData();
    let price = 0

      this.cartData.forEach((item:cart)=>{
        if(item.quantity){
          price = price + (item.pPrice * item.quantity)
        }
      })
      this.subtotal = price;
      if(this.subtotal){
        this.dispalyEmplty = false
      }
      else{
        this.dispalyEmplty = true
      }
      this.text = ((price*18)/100);
      this.discount = ((price*10)/100);
      this.delivery = 100;
      this.totalPrice = price + ((price*18)/100) + ((price*10)/100) + 100;
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
      this.cart.removeItemToCart(product);
      this.getCartData();
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
