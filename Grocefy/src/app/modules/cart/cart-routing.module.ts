import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { SucessComponent } from './sucess/sucess.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:MyCartComponent
  },
  {
    path:'checkout',
    canActivate:[AuthGuard],
    component:CheckOutComponent
  },
  {
    path:'success',
    canActivate:[AuthGuard],
    component:SucessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
