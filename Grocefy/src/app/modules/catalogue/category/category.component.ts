import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {


  
  groceryCategories = [
    {name:'Produce' , source:'assets/categories/produce.png',category: "fruits"},
    {name:'Dairy and Eggs' ,category: "dairy&eggs", source:'/assets/categories/milk.jpg'},
    {name:'Meat and Seafood' ,category: "meat&seafood", source:'/assets/categories/seafood.jfif'},
    {name:'Bakery' ,category: "bakery&bread", source:'/assets/categories/bakery.png'},
    {name:'Frozen Foods' , source:'/assets/categories/frozenfood.png'},
    {name:'Beverages' ,category: "beverages", source:'/assets/categories/beverages.png'},
    {name:'Pantry Staples' , source:'/assets/categories/party.png'},
    {name:'Snacks',category:"snacks&sweets" , source:'/assets/categories/snacks.png'},
    {name:'Deli' , source:'/assets/categories/deli.png'},
    {name:'Personal Care and Household Items' , source:'/assets/categories/household.jfif'}
  ];
}
