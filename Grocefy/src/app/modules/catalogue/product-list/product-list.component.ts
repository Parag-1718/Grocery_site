import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addProduct } from 'src/app/shared/data-type';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { NewProductService } from 'src/app/shared/services/new-product.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  //#region
  productList!: any;
  categoryId: any;
  encryptionId: any;
  category_productArr: any;
  categories:string = 'all categories';

  constructor(
    private currentProduct: ActivatedRoute,
    private product: ProductService,
    private toast: ToastrService,
    private cart: CartService,
    private category: CategoryService,
    private newProduct: NewProductService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit() {
    this.getProductList();
    this.getProduct();
    window.scrollBy(0, 0);

    

    this.category.getCategory().subscribe((res:any)=>{
      console.log("category response", res.data[this.categoryId-1].title);
      this.categories = res.data[this.categoryId-1].title
    })

  }

  getProductList() {
    // this.product.getProduct().subscribe((res: any) => {
    //   this.productList = res;
    // });

    this.newProduct.getAllProducts().subscribe((res:any)=>{
      console.log(res.data);
      if (res.data) {
      this.productList = res.data;
        console.log('Product___Res', res.data);
        for(let i=0;i<res.data.length;i++){
        for(let j=0;j<this.groceryProducts.length;j++){

          if(this.productList[i].title==this.groceryProducts[j].name){
            this.productList[i].avatar_image=this.groceryProducts[j].source
            console.log('Product_---Res', res.data);
          }
        }
      }
      }
    })
  }

  filteredValue: string | null = 'all';
  filterdata(data: string) {
    this.categoryId = data;
    console.log(this.categoryId);
    if(this.categoryId == "all"){
      this.categories = "all categories"
    }
    this.encryption(this.categoryId)

    this.category.getCategory().subscribe((res:any)=>{
      console.log("category response", res.data[this.categoryId-1].title);
      this.categories = res.data[this.categoryId-1].title
    })
  }

  getProduct() {
    // this.currentProduct.paramMap.subscribe((param) => {
    //   if (param.get('name') == null) {
    //     this.filteredValue = 'all';
    //   } else {
    //     this.filteredValue = param.get('name');
    //   }
    // });

    this.currentProduct.paramMap.subscribe((params) => {
      if(params.get('name')){
        this.categoryId = params.get('name');
        console.log(" this.categoryId:", this.categoryId)
        this.encryption(this.categoryId);
      }
      else{
        this.categoryId = "all"
      }
    });
  }

  addToCart(id: number) {
    let item = this.productList.find(
      (product: addProduct) => product.id === id
    );
    if (item) {
      item.quantity = 1;

      let userCart = this.cart.getCartData()
      let currentProduct = userCart.find((product:any) => product.id === item.id);
      if(currentProduct){
        this.toast.info("item is alredy in Cart")
      }
      else{
        this.cart.addItemToCart(item);
        this.toast.success("item is Added!!")
      }
    }
  }

  encryption(id: any) {
    this.encryptionService.encryption(id).subscribe({
      next: (encryptionResponse) => {
        console.log('encryption response::', encryptionResponse);
        this.encryptionId = encryptionResponse.data;
        console.log('Encryption data:', this.encryptionId);
        this.newProduct.getProductByCategoryId(this.encryptionId).subscribe({
          next: (category_products: any) => {
            if (category_products) {
              this.category_productArr = category_products.data;
              console.log('Product___Res', category_products.data);
              for(let i=0;i<category_products.data.length;i++){
              for(let j=0;j<this.groceryProducts.length;j++){
      
                if(this.category_productArr[i].product.title==this.groceryProducts[j].name){
                  this.category_productArr[i].product.avatar_image=this.groceryProducts[j].source
                  console.log('Product_---Res', category_products.data);
                }
              }
            }
              
              this.category_productArr = category_products.data;
              console.log(
                'category wise products:arr=>>>',
                this.category_productArr
              );
            }
          },
          error: () => {},
        });
      },
      error: (encryptionError: any) => {
        console.log('Encryption Error:', encryptionError);
      },
    });
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
