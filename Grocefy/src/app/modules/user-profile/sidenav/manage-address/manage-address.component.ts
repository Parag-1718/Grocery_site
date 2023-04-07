import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { Address, addProduct } from 'src/app/shared/data-type';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent {

  manageAddressForm!:FormGroup
  addresses!: Address[];
  addressId:any;
  addressIDForRemove:any;
  ShowUpdatebtn:boolean = false
  encryptionCode!:any

  constructor( private user:UserService, private toast:ToastrService, private encryptionService:EncryptionService){}
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
    
    // form localStorage
    //  this.addresses = this.user.getAddress()

    this.getAddress();
  }

  getAddress(){
   this.user.getUserDetails().pipe(tap((res:any)=>{
    console.log("details Response",res);
    console.log("Adsress Response",res.data.addresses);
    this.addresses = res.data.addresses;
   }),
   catchError((err:any)=>{
    console.log(err.error);
   return throwError(()=>err)
   })
   ).subscribe();
  }

  add(data:Address){
    //  console.log(data);
    // try {
    //   this.user.addAddress(data).subscribe((res:any)=>{
    //     if(res){
    //        this.toast.success(res.message)
    //        this.user.addAddressToLs(data)
    //    this.addresses = this.user.getAddress()
    //        this.manageAddressForm.reset()
    //     }})
    // } catch (error:any) {
    //    throwError (()=> new Error(error))
    //   this.toast.error(error.error.message)
    // }

    this.user.addAddress(data).pipe(tap((res:any)=>{
      if(res){
        this.toast.success(res.message)
        this.getAddress();
      }
      this.manageAddressForm.reset()
    }),catchError(error =>{
      this.toast.error(error.error.message)
      return throwError(() => error)
    })).subscribe();
    
  }

  delete(id:string | undefined){
  this.addressId = id
  console.log(this.addressId);
  this.removeAddressWithEncryption(this.addressId.toString())
  }

  edit(data:Address){
    //  console.log(data.id);
     this.encryption(data.id?.toString())
     this.ShowUpdatebtn = true;
     this.manageAddressForm.setValue({
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      area: data.area,
      city: data.city,
      state: data.state,
      country:data.country,
      postal_code: data.postal_code,
      landmark: data.landmark,
      tag: data.tag
     })
  }

  onUpdate(data:any){
     console.log("id",this.encryptionCode);
     console.log("data",data);

     this.user.updateAddress(this.encryptionCode,data).subscribe((res:any)=>{
      this.toast.success(res.message)
      this.ShowUpdatebtn = false
      this.manageAddressForm.reset()
      this.getAddress();
     }, err=>{
      console.log(err.error.message);
     })
  }

  encryption(id:any){
    this.encryptionService.encryption(id).subscribe(res=>{
    this.encryptionCode = res.data
    console.log("encrypted response ",this.encryptionCode)
    })
  }

  removeAddressWithEncryption(id:any){
     this.encryptionService.encryption(id).pipe(tap((res:any)=>{
      console.log("Encryption response", res);
      let Encrypted_code = res.data;
      this.user.removeAddress(Encrypted_code).subscribe((res:any)=>{
        this.toast.success(res.message);
        this.getAddress();
      }, err=>{
        this.toast.error(err.error.message)
      })
     })).subscribe()
  }

  }
