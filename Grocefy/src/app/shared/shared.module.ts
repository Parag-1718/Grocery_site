import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CatalogueModule } from '../modules/catalogue/catalogue.module';
import { HttpClientModule } from "@angular/common/http";
import { CartModule } from '../modules/cart/cart.module';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    IvyCarouselModule,
    CatalogueModule,
    HttpClientModule,
    CartModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent
  ]
})
export class SharedModule { }
