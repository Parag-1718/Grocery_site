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
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
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
  }

  save(data:object){
     console.log(data);
  }
}
