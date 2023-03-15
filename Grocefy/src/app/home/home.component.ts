import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  f_item=[
    {title:'Best deals & prices',source:'assets/features/f1.png' ,description:'Don t miss our daily amazing deals and prices'},
    {title:'Refundable',source:'assets/features/f2.png' ,description:'If your items have damagewe agree to refund it'},
    {title:'Free delivery',source:'assets/features/f3.png' ,description:'Do purchase over $50 and get free delivery anywhere'}
   ]

   tendings_item:any = [
    'topsells','toprated','trendingItems','recentlyAdded'
   ]

   topsells=[
    {name:'Orange 1kg' , source:'assets/topsells1.PNG' , price:'2' },
    {name:'Orange 1kg' , source:'assets/topsells2.PNG' , price:'4' },
    {name:'Orange 1kg' , source:'assets/topsells1.PNG' , price:'6' }
   ]
  
   toprated=[
    {name:'Orange 1kg' , source:'assets/topsells2.PNG' , price:'6' },
    {name:'Orange 1kg' , source:'assets/topsells1.PNG' , price:'5' },
    {name:'Orange 1kg' , source:'assets/topsells2.PNG' , price:'3' }
   ]
  
   trendingItems=[
    {name:'Orange 1kg' , source:'assets/topsells1.PNG' , price:'10' },
    {name:'Orange 1kg' , source:'assets/topsells2.PNG' , price:'15' },
    {name:'Orange 1kg' , source:'assets/topsells1.PNG' , price:'13' }
   ]
  
  recentlyAdded=[
    {name:'Orange 1kg' , source:'assets/topsells2.PNG' , price:'20' },
    {name:'Orange 1kg' , source:'assets/topsells1.PNG' , price:'1' },
    {name:'Orange 1kg' , source:'assets/topsells2.PNG' , price:'5' }
  ]
}
