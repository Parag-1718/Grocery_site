import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  
  footer_items:any = [
    {src:"",f_item:"Address:",f_item_details:'1762 School House Road'},
    {src:"",f_item:"Call Us:",f_item_details:'1233-777'},
    {src:"",f_item:"Email:",f_item_details:'groceyish@contact.com'},
    {src:"",f_item:"Work hours:",f_item_details:'8:00 - 20:00, Sunday -  Thursday'}
  ]

  social_accounts:any = [
    {src:"fa-brands fa-square-facebook", href:'https://www.facebook.com/'},
    {src:'fa-brands fa-square-instagram', href:'https://www.instagram.com/'},
    {src:'fab fa-linkedin', href:'https://www.linkedin.com/login'},
    {src:'fab fa-twitter-square', href:'https://twitter.com/'}
  ]
}

