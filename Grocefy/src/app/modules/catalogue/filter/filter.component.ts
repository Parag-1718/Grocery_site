import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  //#region 
  getcategory:any = 'all'
  @Output()
  seletedValue:EventEmitter<string> = new EventEmitter<string>();
  //#endregion

  constructor(private currentProduct:ActivatedRoute){}

  ngOnInit(){
    this.getProduct()
  }

  slectedCetegory(){
        this.seletedValue.emit(this.getcategory)
        console.log(this.getcategory);
  }

  getProduct(){
    this.currentProduct.paramMap.subscribe((parag)=>{
      if(parag.get('name')==null){
        this.getcategory = "all"
      }else{
        this.getcategory= parag.get('name')
      }
    })
  }
}
