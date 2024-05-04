import { Component } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { CmsUserService } from '../../services/cmsuser.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  cmsUserList: any[] = [];
  filterGender: string = ''; // Default filter value
  filterEmail: string = 'ROLE_ADMIN'; // Default filter value
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 10;
  sortField: string = 'cmsUserId';
  sortOrder: string = 'ASC';
  removeFlag: boolean = false;

  constructor(private cmsUserService: CmsUserService,private addressService: AddressService) { }

  ngOnInit() {
    this.getCmsUserList();
  }

  applyFilter() {
    this.pageNumber = 0;
    this.getCmsUserList();
  }

  getCmsUserList() {
    const email = `${this.filterEmail} ${this.filterGender}`.trim();
    debugger
    const params = {
      email: email,
      page: this.pageNumber,
      size: this.pageSize,
      sort: `${this.sortField},${this.sortOrder}`
    };

    this.cmsUserService.getAllCmsUsers(params).subscribe(
      (response: any) => {
        this.cmsUserList = response.cmsUserList;
        this.numberOfPages = response.numberOfPages;
        console.log(this.cmsUserList);
      },
      (error) => {
        console.error('Error occurred while fetching CMS user list:', error);
      }
    );
  }
  sortData(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortField = field;
      this.sortOrder = 'ASC';
    }
    this.getCmsUserList();
  }

  getNextPage() {
    if (this.pageNumber < this.numberOfPages - 1) {
      this.pageNumber++;
      this.getCmsUserList();
    }
  }

  getPreviousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getCmsUserList();
    }
  }

  // Modify the method to generate an array of page numbers
  getPageArray(): number[] {
    return Array.from({ length: this.numberOfPages }, (_, i) => i);
  }

  // Add a method to navigate to a specific page
  goToPage(page: number) {
    this.pageNumber = page;
    this.getCmsUserList();
  }

  checkForRemoveFlag(cmsUserId: number) {
    debugger
    // Check if removeFlag is enabled from another component
    localStorage.setItem('detailsButtonClicked', 'true');
    localStorage.setItem('cmsUserId', cmsUserId.toString());
  }

  deleteCmsUser(cmsUserId: number) {
    console.log(cmsUserId);
    if (confirm('Are you sure you want to delete this user?')) {
      this.cmsUserService.deleteCmsUser(cmsUserId).subscribe(
        () => {
          console.log('Record deleted successfully.');
          this.getCmsUserList(); // Refresh CMS user list after deletion
        },
        (error) => {
          console.error('Error occurred while deleting CMS user:', error);
        }
      );
    }
  }
}
