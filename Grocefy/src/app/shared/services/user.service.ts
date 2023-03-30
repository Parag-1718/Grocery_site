import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { login, SingUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //#region 
  baseUrl = environment.baseUrl;
  constructor( private http:HttpClient, private router:Router) { }

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

  userSingUpToDb(data:any){
    return this.http.post(this.baseUrl+'/customer/register',data,{observe:'response'}).subscribe(res=>{
      console.log(res);
    })
  }
}
