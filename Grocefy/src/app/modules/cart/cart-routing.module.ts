import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { SucessComponent } from './sucess/sucess.component';

const routes: Routes = [
  {
    path:'',
    component:MyCartComponent
  },
  {
    path:'checkout',
    component:CheckOutComponent
  },
  {
    path:'success',
    component:SucessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
