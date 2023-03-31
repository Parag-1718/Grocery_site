import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { SucessComponent } from './sucess/sucess.component';
import { FilterbyCategoryPipe } from './filterby-category.pipe';


@NgModule({
  declarations: [
    MyCartComponent,
    CheckOutComponent,
    SucessComponent,
    FilterbyCategoryPipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
  ]
})
export class CartModule { }
