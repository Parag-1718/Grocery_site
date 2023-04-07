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

    this.activerouter.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
      console.log(" this.productId:", this.productId)
    });
    this.encryption(this.productId);
  }

  getDetails() {
    let productId = this.activerouter.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProductId(productId).subscribe((res) => {
        this.productData = res;
        this.productName = this.productData.pName;
        console.log(this.productData);
      });

      let cartData = localStorage.getItem('localCart')
      if(cartData && productId){
      let item = JSON.parse(cartData);
      item = item.filter((data:addProduct)=> data.id.toString() === productId)
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
        this.productData = res.data
        this.productName = res.data.title
      })
    })
  }
  
}