import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { login, SingUp, userLogin } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //#region 
  base_url = environment.baseUrl;
  user_login = environment.userLogin;
  user_signup = environment.userSignUp;
  user_deatils = environment.customerDetais;

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
    return this.http.post(this.base_url+this.user_login ,data).subscribe((res:any)=>{
      if(res){
         this.toast.success(res.message)
         localStorage.setItem("user",JSON.stringify(res.data))
         this.router.navigate(["/"])
        //  this.getUserDetails();
      }
    },err=>{
      this.toast.error(err.error.message)
    })
  }

  getUserDetails(){
    return this.http.get('https://e099-117-217-127-105.in.ngrok.io/api/v1/customer/customer-details').subscribe((res:any)=>{
      console.log(res);
    })
  }
}
