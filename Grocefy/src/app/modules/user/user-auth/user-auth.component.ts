import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login, SingUp, userLogin } from 'src/app/shared/data-type';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  //#region
  userSingUp!: FormGroup;
  userLogin!: FormGroup;
  loginForm: boolean = false;
  constructor(private user: UserService, private toast: ToastrService, private router:Router, private cart:CartService) {}

  ngOnInit() {
    window.scroll(0,0)

    this.user.userSingupLoginReload();
    this.userSingUp = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        // this.noSpaceAllowed,
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        // this.noSpaceAllowed,
      ]),
      primary_mobile_number: new FormControl(null, [
        Validators.required,
        Validators.pattern('[789][0-9]{9}'),
      ]),
      primary_email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.userLogin = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  showLoginOrRegister() {
    this.loginForm = !this.loginForm;
  }

  singUP(data: SingUp) {
    this.userSingUp.markAllAsTouched()

    console.log(data);
    this.user.userSingUpToDb(data).subscribe(
      (res: any) => {
        if (res) {
          this.toast.success(res.message);
          this.showLoginOrRegister();
        }
      },
      (err) => {
        this.toast.error(err.error.message);
      }
    );

    // this.user.userSingUp(data)
  }

  reset() {
    this.userSingUp.reset();
    this.userLogin.reset();
  }

  login(data: userLogin) {
    this.userLogin.markAllAsTouched()
    
    console.log(data);
    this.user.loginToDb(data).subscribe((res:any)=>{
      if(res){
        let user = this.userLogin.value
        localStorage.setItem("user",JSON.stringify(user))
         this.toast.success(res.message)
         localStorage.setItem("userToken",JSON.stringify(res.data))
         this.router.navigate(["/"])
        setTimeout(() => {
          this.storeLocalCartToRemote()
        }, 1000);
      }
    },err=>{
      this.toast.error(err.error.message)
    })
    // this.user.userLogin(data)
    //  setTimeout(() => {
    //   this.storeLocalCartToRemote();
    //  }, 2000);
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  storeLocalCartToRemote(){
    let cartData = localStorage.getItem('cart_null')
    if(cartData){
      let cartDetails:any = JSON.parse(cartData)
      console.log("cart_null",cartDetails);

      cartDetails.forEach((product:any,index:number) => {

        setTimeout(() => {
              this.cart.addItemToCart(product)
              if(cartDetails.length = index+1){
                localStorage.removeItem('cart_null')
              }
            }, 1000);
          });
      this.toast.info("Cart items is added!!")
    }

    setTimeout(() => {
        this.cart.getCartData()
    }, 1000);
  }

}
