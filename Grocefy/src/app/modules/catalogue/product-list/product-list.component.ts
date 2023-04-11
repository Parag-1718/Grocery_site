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
      this.productList = res.data;
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
      this.cart.addItemToCart(item);
      this.toast.success('item is Added!!');
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
              console.log(
                'Category Wise Products-response:',
                category_products
              );
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
}
