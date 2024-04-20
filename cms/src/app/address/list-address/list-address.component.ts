import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {
  addressList: any[] = [];
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 5;
  sortField: string = 'addressId';
  sortOrder: string = 'ASC';
  userRoles:string;
  userId: string;
  userName: string;

  constructor(private addressService: AddressService,private authService: AuthService) { }

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
  getUserRoles(tokenData: any) {
    debugger
    const userRoles = this.authService.getUserRoles;
  }
  isAdmin(): boolean {
    debugger
    return this.userRoles && this.userRoles.includes('ROLE_ADMIN');
  }
}
