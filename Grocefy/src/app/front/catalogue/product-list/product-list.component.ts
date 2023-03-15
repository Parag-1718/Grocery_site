import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  featuredProducts=[
    {source:'assets/product/p2.png' , name:'Potatos 1kg' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'14,99'},
    {source:'assets/product/p1.png' , name:'Redish 500g' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'9,99'},
    {source:'assets/product/p3.png' , name:'Potatos 1kg' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'14,99'},
    {source:'assets/product/p4.png' , name:'Tomatos200g' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'12,99'},
    {source:'assets/product/p3.png' , name:'Broccoli 1kg' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'10,99'},
    {source:'assets/product/p2.png' , name:'Redish 500g' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'9,99'},
    {source:'assets/product/p1.png' , name:'Beans 250g' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'19,99'},
    {source:'assets/product/p5.png' , name:'Redish 500g' , category:'Vegetables' , rater:'by DadaNiWadi' , price:'9,99'}
  ]
}
