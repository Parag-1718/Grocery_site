import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address, addProduct } from 'src/app/shared/data-type';
import { CartService } from 'src/app/shared/services/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  constructor(private user: UserService,
      private Encryption:EncryptionService,
      private Cart:CartService,
      private Order:OrderService,
      private toast:ToastrService,
      private router:Router,
    ) {}

    //#region 
    addressEncryption!:string;
    orderStatus = "9htZqKFcgoVKuq2rxtHzZA=="
    paymentStatus = "9htZqKFcgoVKuq2rxtHzZA=="
    setlectedAddressTag:string = ''
    checkoutForm! : FormGroup;


  ngOnInit() {
    this.getData();
    window.scroll(0, 0);

      this.checkoutForm = new FormGroup({
        selectOption : new FormControl("",Validators.required)
      })
  }


  deliveryOptions: Address[] = [];
  showDeliveryOptions:boolean =true;


  getData() {
    this.user.getUserDetails().subscribe((res: any) => {
      if(res){
        this.deliveryOptions = res.data.addresses;
        console.log(res.data.addresses);
        this.showDeliveryOptions = true;

        if(this.deliveryOptions.length === 0)
        this.showDeliveryOptions = false
      }
    });
  }

  getAddressId(id: any, tag:string) {
    console.log("id",id);
    this.encryption(id);
    this.setlectedAddressTag = tag
  }

  encryption(id:any){
    this.Encryption.encryption(id.toString()).subscribe((res:any)=>{
      console.log("encryption response Address ...", res.data);
      this.addressEncryption = res.data
    })
  }

  submit(){
    this.checkoutForm.markAllAsTouched()

    let data1 = this.Cart.getCartData();
    console.log("cartData",data1);

   const order_product = [];
    for(let i=0; i<data1.length; i++){
      let order_productData =
        {
          product_id: data1[i].id,
          product_name: data1[i].title,
          qty: data1[i].quantity,
          product_amount: data1[i].amount,
          discount_type: data1[i].discount_type,
          discount_amount: data1[i].discount_amount,
        }
      order_product.push(order_productData);
    }
    console.log("order products",order_product);

    const currentDate = new Date()
    const ordderDate = currentDate
    const futureDate = new Date(ordderDate)
    futureDate.setDate(futureDate.getDate() + 5);

    let summary = localStorage.getItem("summary")
    let orderAmount = summary && JSON.parse(summary);
    console.log("order amounts",orderAmount);

    let data = {
      order_date: ordderDate,
      special_note: "its special",
      estimate_delivery_date: futureDate,
      sub_total: orderAmount.sub_total,
      tax_amount: orderAmount.tax_amount,
      discount_amount: orderAmount.discount_amount,
      total_amount: orderAmount.total_amount,
      paid_amount: orderAmount.total_amount,
      payment_type: 2,
  
      order_products: order_product
    }

    console.log(data);
    
    this.Order.addOrder(data,this.addressEncryption,this.addressEncryption,this.paymentStatus,this.orderStatus).subscribe((res:any)=>{
      console.log("order response...", res);
      this.toast.success(res.message)
      localStorage.setItem("orderId",res.data.id)
      this.router.navigate(['/module/cart/success'])
    }, err=>{
      console.log(err);
      this.toast.error(err.error.message)
    })
  }
}

