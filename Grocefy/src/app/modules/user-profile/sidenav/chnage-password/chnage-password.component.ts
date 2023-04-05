import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.css']
})
export class ChnagePasswordComponent {

  //#region 
  changePasswordForm!: FormGroup;
  loginForm: boolean = false;
  constructor(private user: UserService, private toast: ToastrService) {}

  ngOnInit(){

    this.user.getUserDetails();

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
    this.changePasswordForm.controls['confirmPassword'].setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this.changePasswordForm)
    ]);
    }

  save(data:object){
     console.log(data);
     this.user.changePassword(data).subscribe((res:any)=>{
         if(res){
          this.toast.success(res.message);
          this.changePasswordForm.reset();
         }
     },err=>{
        this.toast.error(err.error.message)
     })
  }
  
  passwordMatchValidator(control: FormControl){
    const form = this as unknown as FormGroup;
    if (control.value && control.value !== form.controls['newPassword'].value) {
      return { passwordMismatch: true };
    }
    return null;
  }
  
  
}
