import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 {
  path: 'front',
  loadChildren: () => import('./front/front.module').then(m => m.FrontModule)
 },
 {
  path: '',
  component: HomeComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
