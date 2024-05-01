import { Component } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EditContentComponent } from '../edit-content/edit-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content-list-for-all-users',
  templateUrl: './content-list-for-all-users.component.html',
  styleUrl: './content-list-for-all-users.component.css'
})
export class ContentListForAllUsersComponent {
  file: File = null;
  userId: number;
  showUploadForm: boolean = false;

  contentList: any[] = [];
  filterTitle: string = ''; // Default filter value
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 10;
  sortField: string = 'contentId';
  sortOrder: string = 'ASC';
  userName: string;

  constructor(private contentService: ContentService, private router: Router, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getContentList();
  }

  applyFilter() {
    this.pageNumber = 0;
    this.getContentList();
  }

  getContentList() {
    const params = {
      title: this.filterTitle,
      page: this.pageNumber,
      size: this.pageSize,
      sort: `${this.sortField},${this.sortOrder}`
    };

    this.contentService.getAllContentsByUser(params).subscribe(
      (response: any) => {
        this.contentList = response.contentList;
        this.numberOfPages = response.numberOfPages;
        console.log(this.contentList);
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
    this.getContentList();
  }

  getNextPage() {
    if (this.pageNumber < this.numberOfPages - 1) {
      this.pageNumber++;
      this.getContentList();
    }
  }

  getPreviousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getContentList();
    }
  }

  // Modify the method to generate an array of page numbers
  getPageArray(): number[] {
    return Array.from({ length: this.numberOfPages }, (_, i) => i);
  }

  // Add a method to navigate to a specific page
  goToPage(page: number) {
    this.pageNumber = page;
    this.getContentList();
  }

  downloadContent(content: any) {
    this.contentService.downloadContent(content.contentId).subscribe(
      (response: any) => {
        debugger
        const headers = response.headers;
        const contentDisposition = headers.get('Content-Disposition');
        // Extract filename from Content-Disposition header
        let filename = '';
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches && matches.length > 1) {
            filename = matches[1].replace(/['"]/g, '');

          }
        }
        // Save file with the extracted filename
        this.saveFile(response.body, filename);
      },
      (error) => {
        console.error('Error occurred while downloading content:', error);
      }
    );
  }


  private saveFile(blob: Blob, filename: string): void {
    console.log("filename:" + filename);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }



  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const userDetails = this.authService.getUserDetails(token);
      this.userId = parseInt(userDetails.userId, 10);
      this.userName = userDetails.userName;
    }
  }
}
