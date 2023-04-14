import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
    <div class="container">
  <div class="row">
    <div class="col-md-12 text-center">
      <img src="/assets/Notfound.jpg" alt="Page Not Found" class="img-fluid">
      <h1 class="mt-4">Oops!</h1>
      <a [routerLink]="['/']" routerLinkActive="router-link-active"  class="btn btn-outline-primary"><i class="fas fa-home"></i> Go to Home</a>
    </div>
  </div>
</div>
  `,
  styles: [
    `
    .container{
        margin-bottom: 20px;
    }
    img{
    
    }
    .img-fluid {
      max-width: 30%;
      margin-top: 3rem;
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }`
  ]
})
export class NotfoundComponent {

}
