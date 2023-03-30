import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from 'src/app/shared/data-type';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  //#region 
  productList!: addProduct[];
  constructor(private currentProduct:ActivatedRoute , private product:ProductService){}


  ngOnInit(){  
    this.getProductList()
    this.getProduct()
    window.scrollBy(0,0)
  }

  getProductList() {
    this.product.getProduct().subscribe((res: any) => {
      this.productList = res;
    });
  }

  filteredValue: string | null = "all"
  filterdata(data:string){
     this.filteredValue = data;
     console.log(this.filteredValue);
  }
  
  getProduct(){
    this.currentProduct.paramMap.subscribe((parag)=>{
      if(parag.get('name')==null){
        this.filteredValue = "all"
      }else{
        this.filteredValue= parag.get('name')
      }
    })
  }
}
