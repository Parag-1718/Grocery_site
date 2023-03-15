import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  food: any;
  categories=[
    {name: 'Fruits' , num_of_items:'20 ', source : 'assets/f.jfif' },
    {name: 'Fruits' , num_of_items:'20 ', source : 'assets/f.jfif' },
    {name: 'Fruits' , num_of_items:'20 ', source : 'assets/f.jfif' },
    {name: 'Fruits' , num_of_items:'20 ', source : 'assets/f.jfif' },
    {name: 'Fruits' , num_of_items:'20 ', source : 'assets/f.jfif' },
    {name: 'Fruits' , num_of_items:'20 ', source : 'assets/f.jfif' },

   ]
}
