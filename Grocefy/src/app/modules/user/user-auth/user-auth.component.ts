import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { login, SingUp, userLogin } from 'src/app/shared/data-type';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  //#region 
  userSingUp!:FormGroup;
  userLogin!:FormGroup
  loginForm:boolean = false
  constructor( private user:UserService) {}

  ngOnInit(){
    this.user.userSingupLoginReload();
    this.userSingUp = new FormGroup({
      first_name: new FormControl(null,[Validators.required,this.noSpaceAllowed]),
      last_name: new FormControl(null,[Validators.required,this.noSpaceAllowed]),
      primary_mobile_number:new FormControl(null,[Validators.required,Validators.pattern('[789][0-9]{9}')]),
      primary_email: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      username: new FormControl(null,[Validators.required,Validators.minLength(4)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
    this.userLogin = new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.minLength(4)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    })

   
  }

  showLoginOrRegister(){
     this.loginForm = !this.loginForm
  }

  singUP(data:any){
    console.log(data);
    // console.log(this.userSingUp.get('first_name')?.errors?.['noSpaceAllowed']);
    // this.user.userSingUpToDb(data)
    // this.user.userSingUp(data)
    // this.showLoginOrRegister()
  }
  reset(){
    this.userSingUp.reset();
    this.userLogin.reset();
  }
  login(data:userLogin){
    console.log(data);
    // this.user.userLogin(data)
    //  setTimeout(() => {
    //   this.storeLocalCartToRemote();
    //  }, 2000);
  }

  noSpaceAllowed(control:FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed:true}
    }
    return null
}
}
