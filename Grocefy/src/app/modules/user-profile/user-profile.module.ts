import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileComponent } from './sidenav/profile/profile.component';
import { OrderComponent } from './sidenav/order/order.component';
import { ManageAddressComponent } from './sidenav/manage-address/manage-address.component';
import { ChnagePasswordComponent } from './sidenav/chnage-password/chnage-password.component';


@NgModule({
  declarations: [
    SidenavComponent,
    ProfileComponent,
    OrderComponent,
    ManageAddressComponent,
    ChnagePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
