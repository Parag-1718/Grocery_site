import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent {

  addresses: any[] = [
    { name: 'Ram Parmar', street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' },
    { name: 'shiv Solanki', street: '456 Elm St', city: 'Somewhere', state: 'NY', zip: '67890' },
    { name: 'Vishnu Yadav', street: '789 Oak St', city: 'Nowhere', state: 'TX', zip: '54321' }
  ];

  editAddress(address: any) {
  }

  deleteAddress(address: any) {
  }
}
