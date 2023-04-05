import { Component } from '@angular/core';
import { Address, addProduct } from 'src/app/shared/data-type';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {

  constructor( private user:UserService){}

  ngOnInit(){
    this.getData()
    window.scroll(0,0)

  }

  deliveryOptions:Address[] = []

  getData(){
    this.deliveryOptions = this.user.getAddress()
     }
}

