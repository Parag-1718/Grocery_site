import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    IvyCarouselModule,
    FormsModule
  ],
  exports: [
    CategoryComponent
  ]
})
export class CatalogueModule { }
