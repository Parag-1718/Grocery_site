import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { addProduct, Address, login, SingUp, userLogin } from '../data-type';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //#region 
  base_url = environment.baseUrl;
  user_login = environment.userLogin;
  user_signup = environment.userSignUp;
  user_deatils = environment.customerDetais;
  change_password = environment.changePassword;
  update_profile = environment.editCustomer;
  add_address = environment.addCustomerAddress;
  delete_address = environment.deleteCustomerAddres;
  edit_address = environment.editAddress;
  header = environment.header

  constructor( private http:HttpClient, private router:Router, private toast:ToastrService) { }

  userSingUp(data:SingUp){
    return this.http.post('http://localhost:3000/users',data,{observe:'response'}).subscribe(res=>{
       //  console.log(res);
       if(res && res.body){
         // localStorage.setItem("user",JSON.stringify(res.body))user
        //  this.router.navigate(["module/user"])
       }
     })
   }

   userLogin(data:login){
    return this.http.get(`http://localhost:3000/users?email=${data.email}&pass:${data.pass}`,{observe:'response'}).subscribe(res=>{
     // console.log(res);
     if(res && res.body){
       localStorage.setItem('user',JSON.stringify(res.body))
       this.router.navigate(['/'])
     }
    })
   }

   userSingupLoginReload(){
    if(localStorage.getItem('user'))
    this.router.navigate(['/'])
  }

  userSingUpToDb(data:SingUp){
    return this.http.post(this.base_url+this.user_signup,data)
  }

  loginToDb(data:userLogin){
    return this.http.post(this.base_url+this.user_login ,data)
  }

  getUserDetails(){
    return this.http.get(this.base_url+this.user_deatils,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})}
    )
  }

  changePassword(data:object){
    return this.http.put(this.base_url+this.change_password,data)
  }

  updateProfiile(data:object){
    return this.http.put(this.base_url+this.update_profile,data)
  }

  addAddress(data:Address){
    return this.http.post(this.base_url+this.add_address,data)
  }

  getAddress(){
    let addressData = localStorage.getItem('Address')
    let Address = addressData && JSON.parse(addressData);
    return Address || [];
  }

  addAddressToLs(item:Address){
    let userAddress = this.getAddress();
    let currentAddress = userAddress.find((add:any) => add.tag != item.tag);
     userAddress.push(item)
  
    localStorage.setItem('Address',JSON.stringify(userAddress));
  }

  removeAddressToLs(item:Address){
    let userAddress = this.getAddress();
    let indexOfItem = userAddress.findIndex((add:any) => add.tag === item.tag);
    if(indexOfItem != -1){
      userAddress.splice(indexOfItem,1)
    }
    localStorage.setItem('Address',JSON.stringify(userAddress)) 
  }

  removeAddress(encryption:string){
    return this.http.delete(this.base_url + this.delete_address, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
        'address_id': encryption,
      }),
    })
  }

  updateAddress(encryption:string,data:any){
    try {
      return this.http.put(this.base_url + this.edit_address, data,
        {headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning','Access-Control-Allow-Origin': '*','address_id': encryption,}),
      })
    } catch (error:any) {
      return throwError(() => new Error(error));
    }
  } 
}
