import { Component } from '@angular/core';
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
    ) {}

    //#region 
    addressEncryption!:string;
    orderStatus = "W4YV_pkH7OAkvZO4P1gbzA=="
    paymentStatus = "W4YV_pkH7OAkvZO4P1gbzA=="

  ngOnInit() {
    this.getData();
    window.scroll(0, 0);
  }


  deliveryOptions: Address[] = [];

  getData() {
    this.user.getUserDetails().subscribe((res: any) => {
      this.deliveryOptions = res.data.addresses;
      console.log(res.data.addresses);
    });
  }

  getAddressId(id: any) {
    console.log("id",id);
    this.encryption(id);
    setTimeout(() => {
      this.submit()
    }, 1000);
  }

  encryption(id:any){
    this.Encryption.encryption(id.toString()).subscribe((res:any)=>{
      console.log("encryption response Address ...", res.data);
      this.addressEncryption = res.data
    })
  }

  submit(){
    let data = this.Cart.getCartData();
    console.log(data);

    this.Order.addOrder(data,this.addressEncryption,this.addressEncryption,this.paymentStatus,this.orderStatus).subscribe((res:any)=>{
      console.log("order response...", res);
      this.toast.success(res.message)
    }, err=>{
      console.log(err);
      this.toast.error(err.error.message)
    })
  }
}

