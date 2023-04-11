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
      console.log("res", res);
      this.products = res.data
    })

  }

  addToCart(id: number) {

    let item = this.products.find((product: addProduct) => product.id === id);
    item.quantity = 1;
    this.cart.addItemToCart(item);
    this.toast.success("item is Added!!")
  }

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
