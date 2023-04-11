import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient
  ) { }

  //#region 
  baseUrl = environment.baseUrl;
  add_order = environment.addOrder;
  get_order_by_id = environment.getOrderById;
  get_order_by_customer_id = environment.getCustomerAllOrder

  addOrder(data:any,delivery_address_id:any,billing_address_id:any,payment_status:any,order_status:any){
    try {
      return this.http.post<any>(this.baseUrl + this.add_order, data, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          billing_address_id: billing_address_id,
          delivery_address_id: delivery_address_id,
          payment_status: payment_status,
          order_status: order_status,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getOrderById(encryption:string){
   return this.http.get(this.baseUrl + this.get_order_by_id, {
    headers: new HttpHeaders({
      'ngrok-skip-browser-warning': 'skip-browser-warning',
      'Access-Control-Allow-Origin': '*',
      'order_id': encryption
    }),
   })
  }

  getAllOrdersByCustomerId(){
    return this.http.get(this.baseUrl + this.get_order_by_customer_id, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
      }),
    })
  }

}

