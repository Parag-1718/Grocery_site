import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './user-profile/sidenav/sidenav.component';

const routes: Routes = [
  {
    path:'catalogue',
    loadChildren:()=> import("./catalogue/catalogue.module").then(m => m.CatalogueModule)
   },
  {
    path:'user',
    loadChildren:()=> import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path:'user-profile',
    loadChildren:()=> import('./user-profile/user-profile.module').then(m=>m.UserProfileModule)
  },
  {
    path:'cart',
    loadChildren:()=> import('./cart/cart.module').then(m=>m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
