import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  currentcom: string | null= 'profile';
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    
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
}
