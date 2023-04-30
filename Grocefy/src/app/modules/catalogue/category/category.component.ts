import { Component } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  private _encryptionservice: any;


  constructor(
    private category:CategoryService,
  ){}
  
  //#region 
  productCategory:any = [];
  ngOnInit(){
    this.getCategory()
    // this.GetProductByCategory(this.encryption_data)
  }


  getCategory(){
    try {
      this.category.getCategory().subscribe((res:any)=>{
        console.log(res);
        // if(res){
        //   this.productCategory = res.data;
        // }
        if (res.data) {
          this.productCategory = res.data;
          console.log('Product_Res', res.data);
          for(let i=0;i<res.data.length;i++){
          for(let j=0;j<this.groceryCategories.length;j++){

            if(this.productCategory[i].title==this.groceryCategories[j].name){
              this.productCategory[i].avatar_image=this.groceryCategories[j].source
              console.log('Product_Res', res.data);
            }
          }
        }
        }
      })
    } catch (error:any) {
      console.log(error.error.message);
    }
  }

  groceryCategories = [
    {name:'fruits' , source:'assets/categories/fruits.jpg',category: "fruits"},
    {name:'dairy and eggs' ,category: "dairy&eggs", source:'/assets/categories/milk.jpg'},
    {name:'meat and seafood' ,category: "meat&seafood", source:'/assets/categories/seafood.jfif'},
    {name:'bakery and bread' ,category: "bakery&bread", source:'/assets/categories/bakery.png'},
    {name:'vegetables' , source:'/assets/categories/vegetables.png'},
    {name:'beverages' ,category: "beverages", source:'/assets/categories/beverages.png'},
    {name:'Pantry Staples' , source:'/assets/categories/party.png'},
    {name:'Snacks',category:"snacks&sweets" , source:'/assets/categories/snacks.png'},
    {name:'Deli' , source:'/assets/categories/deli.png'},
    {name:'Personal Care and Household Items' , source:'/assets/categories/household.jfif'}
  ];

  
  
}
