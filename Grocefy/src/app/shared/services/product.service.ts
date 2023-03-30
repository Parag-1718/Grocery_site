import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { addProduct, cart } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItem: EventEmitter<addProduct[] | []> = new EventEmitter<
    addProduct[] | []
  >();
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get('http://localhost:3000/products');
  }
  popularProducts() {
    return this.http.get<addProduct[]>(
      'http://localhost:3000/products?_limit=9'
    );
  }

  getProductId(id: string) {
    return this.http.get<addProduct>(`http://localhost:3000/products/${id}`);
  }

  addToCart(data:cart){
    return this.http.post('http://localhost:3000/cart',data)
  }

  getCartData(userId:number){
    return this.http.get<addProduct[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'}).subscribe((res)=>{
      if(res && res.body){
        this.cartItem.emit(res.body)
      }
    })
  }

  GetCart(){
    // get the id of user
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user)[0].id
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userId)
  }

  removeCart(cartID:number){
    return this.http.delete('http://localhost:3000/cart/'+cartID,{observe:'response'}).subscribe((res:any)=>{
      if(res && res.body){
        this.cartItem.emit(res.body)
      }
    })
  }

  updateCart(id:number,data:cart){
    return this.http.put("http://localhost:3000/cart/"+id,data)
   }

  addCartToLocalStorage(data: addProduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartItem.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartItem.emit(cartData);
  }

  removeCartToLocalStorage(id: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: addProduct[] = JSON.parse(cartData);
      items = items.filter((data: addProduct) => id !== data.id);
      console.log(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartItem.emit(items);
    }
  }

  getCart(){
     let cartData = localStorage.getItem('localCart')
     let cart:cart[] = cartData && JSON.parse(cartData)
     return cart
  }
}
