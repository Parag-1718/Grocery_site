import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChnagePasswordComponent } from './sidenav/chnage-password/chnage-password.component';
import { ManageAddressComponent } from './sidenav/manage-address/manage-address.component';
import { OrderComponent } from './sidenav/order/order.component';
import { ProfileComponent } from './sidenav/profile/profile.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {
   path:'',
   component:SidenavComponent,
   children:[
    {path:'', component:ProfileComponent},
    {path:'order', component:OrderComponent},
    {path:'manage-address', component:ManageAddressComponent},
    {path:'change-password', component:ChnagePasswordComponent}
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
