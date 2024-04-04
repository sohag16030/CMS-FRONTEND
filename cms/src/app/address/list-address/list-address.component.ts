import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {
  addressList: any[] = [];
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 3;
  sortField: string = 'addressId';
  sortOrder: string = 'ASC';

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.getAddressList();
  }

  getAddressList() {
    const params = {
      page: this.pageNumber,
      size: this.pageSize,
      sort: `${this.sortField},${this.sortOrder}`
    };

    this.addressService.getAllAddresses(params).subscribe(
      (response: any) => {
        this.addressList = response.addressList;
        this.numberOfPages = response.numberOfPages;
        console.log(this.addressList);
      },
      (error) => {
        console.error('Error occurred while fetching address list:', error);
      }
    );
  }

  getNextPage() {
    if (this.pageNumber < this.numberOfPages - 1) {
      this.pageNumber++;
      this.getAddressList();
    }
  }

  getPreviousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getAddressList();
    }
  }

  deleteAddress(addressId: number) {
    console.log(addressId);
    this.addressService.deleteAddress(addressId).subscribe(
      () => {
        console.log('Address deleted successfully.');
        this.getAddressList(); // Refresh address list after deletion
      },
      (error) => {
        console.error('Error occurred while deleting address:', error);
      }
    );
  }
}
