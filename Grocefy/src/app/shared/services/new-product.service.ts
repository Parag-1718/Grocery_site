import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(
    private http:HttpClient
  ) { }

  //#region 
  base_url = environment.baseUrl;
  get_product_by_category_id = environment.getProductByCategoryId;
  get_product_by_product_id = environment.getProductById;
  get_all_products = environment.getAllProducts;
  header= environment.header

  getProductByCategoryId(encryption: any): Observable<any> {
    try {
      return this.http.get<any>(
        this.base_url + this.get_product_by_category_id,
        {
          headers: new HttpHeaders({
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Access-Control-Allow-Origin': '*',
            'category_id': encryption,
          }),
        }
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getProductById(encryption: any) {
    try {
      return this.http.get<any>(this.base_url + this.get_product_by_product_id, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          'product_id': encryption,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getAllProducts(){
    return this.http.get(this.base_url + this.get_all_products, this.header)
  }
}
