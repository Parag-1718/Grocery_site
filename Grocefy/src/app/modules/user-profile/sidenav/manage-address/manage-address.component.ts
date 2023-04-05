import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address, addProduct } from 'src/app/shared/data-type';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent {

  manageAddressForm!:FormGroup
  addresses: Address[] = [];

  constructor( private user:UserService, private toast:ToastrService){}
  ngOnInit(){
    this.manageAddressForm = new FormGroup({
      address_line_1: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      address_line_2: new FormControl('', [Validators.maxLength(50)]),
      area: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      country: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      postal_code: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
      landmark: new FormControl('', [Validators.maxLength(50)]),
      tag: new FormControl(''),
    });
    
     this.addresses = this.user.getAddress()
  }

  add(data:Address){
     console.log(data);
     this.user.addAddress(data).subscribe((res:any)=>{
      if(res){
         this.toast.success(res.message)
         this.user.addAddressToLs(data)
     this.addresses = this.user.getAddress()
         this.manageAddressForm.reset()
      }
     }, err=>{
        this.toast.error(err.error.message)
     })
  }

  delete(add:Address){
    this.user.removeAddressToLs(add)
    this.addresses = this.user.getAddress()
  }
}
