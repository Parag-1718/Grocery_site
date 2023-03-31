import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  //#region 
  userProfileForm!:FormGroup;
  constructor( private user:UserService){}

  ngOnInit(){

    this.user.getUserDetails();

    this.userProfileForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        this.noSpaceAllowed,
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        this.noSpaceAllowed,
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
      ])
    })
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  save(data:object){
     console.log(data);
  }
}
