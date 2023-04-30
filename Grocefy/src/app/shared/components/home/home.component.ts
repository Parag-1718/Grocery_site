import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { addProduct } from '../../data-type';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { NewProductService } from '../../services/new-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  //#region
  products: any = [];
  //#endregion
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private toast:ToastrService,
    private user:UserService,
    private newProduct:NewProductService,

  ) {}

  ngOnInit() {
    this.getPopularProducts();

  }

  getPopularProducts() {
    // this.productService.popularProducts().subscribe((res) => {
    //   // console.log(res);
    //   this.products = res;
    // });

    this.newProduct.getAllProducts().subscribe((res:any)=>{
      // console.log("res", res);
      if (res.data) {
        this.products = res.data;
        console.log('Product___Res', res.data);
        for(let i=0;i<res.data.length;i++){
        for(let j=0;j<this.groceryProducts.length;j++){

          if(this.products[i].title==this.groceryProducts[j].name){
            this.products[i].avatar_image=this.groceryProducts[j].source
            console.log('Product_---Res', res.data);
          }
        }
      }
      }
    })

  }

  addToCart(id: number) {

    let item = this.products.find((product: addProduct) => product.id === id);
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

//   1	
// 2	
// 3	
// 4	
// 5	
// 6	
// 7	
// 8	
// 9	
// 10	
// 11	
// 12	
// 13	
// 14	
// 15	
// 16	
// 17	
// 18	
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

  f_item = [
    {
      title: 'Best deals & prices',
      source: 'assets/features/f1.png',
      description: 'Don t miss our daily amazing deals and prices',
    },
    {
      title: 'Refundable',
      source: 'assets/features/f2.png',
      description: 'If your items have damagewe agree to refund it',
    },
    {
      title: 'Free delivery',
      source: 'assets/features/f3.png',
      description: 'Do purchase over $50 and get free delivery anywhere',
    },
  ];

  tendings_item: any = [
    'topsells',
    'toprated',
    'trendingItems',
    'recentlyAdded',
  ];

  topItems: any = [
    [
      { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '2' },
      { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '4' },
      { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '6' },
    ],
    [
      { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '6' },
      { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '5' },
      { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '3' },
    ],
    [
      { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '10' },
      { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '15' },
      { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '13' },
    ],
    [
      { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '20' },
      { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '1' },
      { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '5' },
    ],
  ];

  topsells = [
    { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '2' },
    { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '4' },
    { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '6' },
  ];

  toprated = [
    { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '6' },
    { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '5' },
    { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '3' },
  ];

  trendingItems = [
    { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '10' },
    { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '15' },
    { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '13' },
  ];

  recentlyAdded = [
    { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '20' },
    { name: 'Orange 1kg', source: 'assets/topsells1.PNG', price: '1' },
    { name: 'Orange 1kg', source: 'assets/topsells2.PNG', price: '5' },
  ];
}
