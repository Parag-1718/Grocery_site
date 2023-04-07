import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }

  //#region 
  base_url = environment.baseUrl;
  get_all_category = environment.getAllCategory;
  header = environment.header;
  get_product_by_category_id = environment.getProductByCategoryId


  getCategory(){
    return this.http.get(this.base_url + this.get_all_category,this.header)
  }
}
