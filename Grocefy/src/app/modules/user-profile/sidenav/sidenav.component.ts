import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  currentcom: string | null= 'profile';
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    window.scroll(0,0)
    
    if(localStorage.getItem('current')){
      let item = localStorage.getItem('current')
      this.currentcom = item && localStorage.getItem('current')
    }


    this.router.events.subscribe((res: any) => {
      if (res.url) {
        let url = res.url;
        this.currentcom = this.getLastUrlValue(url);
        if (this.currentcom == 'user-profile') {
          this.currentcom = 'profile';
        }
        else if(this.currentcom == 'user_auth'){
          this.currentcom = 'profile';
        }
        // console.log(this.currentcom);
        localStorage.setItem('current',this.currentcom)
      }
    });
  }

  getLastUrlValue(url: string) {
    var parts = url.split('/');
    // console.log(parts);
    return parts[parts.length - 1];
  }

  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('userToken')
    localStorage.removeItem('current')
   }
}
