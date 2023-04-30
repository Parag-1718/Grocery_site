import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addProduct, cart } from 'src/app/shared/data-type';
import { CartService } from 'src/app/shared/services/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { NewProductService } from 'src/app/shared/services/new-product.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  //#region
  productData: any | undefined;
  productName!: string | null;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cuurentCartItem!:addProduct;
  productId!:any

  constructor(
    private activerouter: ActivatedRoute,
    private product: ProductService,
    private newproduct: NewProductService,
    private cart:CartService,
    private toast:ToastrService,
    private Encryption:EncryptionService
  ) {}
  ngOnInit() {
    // this.getDetails();
    window.scrollBy(0,0)
    this.GetDetails();
   
  }

  getDetails() {

    let productId = this.activerouter.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProductId(productId).subscribe((res) => {
        this.productData = res;
        this.productName = this.productData.pName;
        console.log(this.productData);
      });
      let userData = localStorage.getItem("userToken")
      let userName = userData && JSON.parse(userData).user.username;
      console.log(userName);
      let cartData = localStorage.getItem(`cart${userName}`)
      if(cartData && productId){
      let item = JSON.parse(cartData);
      item = item.filter((data:any)=> data.id.toString() === productId)
      if(item.length){
        this.removeCart = true
      }
      else{
        this.removeCart = false
      }
    }

    let user =  localStorage.getItem('user')
    if(user){
     let userId = user && JSON.parse(user)[0].id
     this.product.getCartData(userId)
     this.product.cartItem.subscribe((res)=>{
      let items = res.filter((item:addProduct)=> productId==item.productId?.toString())
      if(items.length){
          this.cuurentCartItem = items[0]
        this.removeCart = true
      }
      else{
        this.removeCart =false
      }
     })    
    }
  }

  quantity(data: string) {
    if (data === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
    if (data === 'pluse' && this.productQuantity < 20) {
      this.productQuantity += 1;
    }
  }

  addToCart(data:any) {
    if(this.productData){
      this.productData.quantity = this.productQuantity
    }
   this.cart.addItemToCart(data);
   this.toast.success("item is Added!!")
   this.removeCart = true;
  }

  removeToCart(data:any){
   this.cart.removeItemToCart(data);
   this.toast.success("item is Removed!!")
   this.removeCart = false;
  }

  encryption(id:number){
    this.Encryption.encryption(id).subscribe((res:any)=>{
      console.log("Encryption response :",res.data);
      this.newproduct.getProductById(res.data).subscribe((res:any)=>{
        console.log("product by id : ", res.data);
        if (res.data) {
          this.productData = res.data;
            console.log('ProductData', res.data);
            for(let j=0;j<this.groceryProducts.length;j++){
    
              if(this.productData.title==this.groceryProducts[j].name){
                this.productData.avatar_image=this.groceryProducts[j].source
                console.log('Product_---Res', res.data);
              }
            }
          }
        this.productData = res.data
        this.productName = res.data.title
      })
    })
  }

  GetDetails(){
    this.activerouter.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
      console.log(" this.productId:", this.productId)
    });
    this.encryption(this.productId);

    let userData = localStorage.getItem("userToken")
      let userName = userData && JSON.parse(userData).user.username;
      console.log(userName);

      let cartData = localStorage.getItem(`cart_${userName}`)
      if(cartData && this.productId){
      let item = JSON.parse(cartData);
      item = item.filter((data:any)=> data.id.toString() === this.productId)
      if(item.length){
        this.removeCart = true
      }
      else{
        this.removeCart = false
      }
  }
}

groceryProducts = [
  {name:'banana' , source:'/assets/products/banana.jpg'},
  {name:'grapes', source:'/assets/products/grapes.jpg'},
  {name:'apple', source:'/assets/products/apple.jpg'},
  {name:'mango' , source:'/assets/products/mango.jpg'},
  {name:'patato' , source:'/assets/products/patato.jpg'},
  {name:'tomato', source:'/assets/products/tomato.jpg'},
  {name:'spring onion' , source:'/assets/products/spring onion.jpg'},
  {name:'cookies', source:'/assets/products/cookies.jpg'},
  {name:'bread' , source:'/assets/products/bread.jpg'},
  {name:'biscuits' , source:'/assets/products/biscuits.jpg'},
  {name:'amul taza' , source:'/assets/products/amul taza.jpg'},
  {name:'bournvita' , source:'/assets/products/bournvita.jpg'},
  {name:'almond' , source:'/assets/products/almond.jpg'},
  {name:'eggs' , source:'/assets/products/eggs.jpg'},
  {name:'meat' , source:'/assets/products/meat.jpg'},
  {name:'dry seafood' , source:'/assets/products/dry fish.jpg'},
  {name:'thums up' , source:'/assets/products/thumps up.jpg'},
  {name:'beer' , source:'/assets/products/beer.jpg'},

];
}