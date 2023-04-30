import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  //#region 
  userProfileForm!:FormGroup;
  resData : any;
  constructor( private user:UserService, private toast:ToastrService, private router:Router){}

  ngOnInit(){

    this.user.getUserDetails().subscribe((res:any)=>{
      if(res){
        this.resData = res.data;
        console.log(this.resData);
        this.userProfileForm.setValue({
         first_name: this.resData.first_name || "",
         last_name:this.resData.last_name || '',
         primary_mobile_number: this.resData.primary_mobile_number || '',
         primary_email:this.resData.primary_email || '',
         secondary_mobile_number: "",
         secondary_email: "",
         date_of_birth:"",
         password: "",
 
        })
      }

    })

    this.userProfileForm = new FormGroup({
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
      secondary_mobile_number: new FormControl(null, [
        Validators.required,
        Validators.pattern('[789][0-9]{9}'),
      ]),
      secondary_email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      date_of_birth: new FormControl(null,[
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  save(data:object){
    this.userProfileForm.markAllAsTouched()
     console.log(data);
     this.user.updateProfiile(data).subscribe((res:any)=>{
      if(res){
       this.toast.success(res.message);
       this.userProfileForm.reset();
       this.router.navigate(['/'])
      }
  },err=>{
     this.toast.error(err.error.message)
  })
  }
}
