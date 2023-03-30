import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
 {
  path:'shared',
  loadChildren:()=> import("./shared/shared.module").then(m => m.SharedModule)
 },
 {
  path:'module',
  loadChildren:()=> import("./modules/modules.module").then(m => m.ModulesModule)
 },
 {
  path:'',
  component:HomeComponent
 },
 {
  path:'**',
  component:NotfoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
