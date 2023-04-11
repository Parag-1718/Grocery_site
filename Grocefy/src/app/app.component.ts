import { Component } from '@angular/core';
import { NgSpinKitModule } from 'ng-spin-kit'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'grocefy';

  ngOnInit(){
    window.scroll(0,0)
  }
}
