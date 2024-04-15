import { Component, OnInit } from '@angular/core';
import { CmsUserService } from '../services/cmsuser.service';

@Component({
  selector: 'app-cms-user-list',
  templateUrl: './list-cms-users.component.html',
  styleUrls: ['./list-cms-users.component.css']
})
export class CmsUserListComponent implements OnInit {

  cmsUserList: any[] = [];
  filterGender: string = ''; // Default filter value
  filterEmail: string = ''; // Default filter value
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 3;
  sortField: string = 'cmsUserId';
  sortOrder: string = 'ASC';

  constructor(private cmsUserService: CmsUserService) { }

  ngOnInit() {
    this.getCmsUserList();
  }

  applyFilter() {
    this.pageNumber = 0;
    this.getCmsUserList();
  }

  getCmsUserList() {
    const params = {
      gender: this.filterGender,
      email: this.filterEmail,
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

  // Modify the method to generate an array of page numbers
  getPageArray(): number[] {
    return Array.from({ length: this.numberOfPages }, (_, i) => i);
  }

  // Add a method to navigate to a specific page
  goToPage(page: number) {
    this.pageNumber = page;
    this.getCmsUserList();
  }

}
