import { Component } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-contents',
  templateUrl: './list-contents.component.html',
  styleUrl: './list-contents.component.css'
})
export class ListContentsComponent {

  file: File = null;
  userId: number;
  showUploadForm: boolean = false;

  contentList: any[] = [];
  filterTitle: string = ''; // Default filter value
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 3;
  sortField: string = 'contentId';
  sortOrder: string = 'ASC';
  userName:string;

  constructor(private contentService: ContentService, private router: Router,private authService: AuthService) { }

  ngOnInit() {
    this.getContentList();
    this.isUser();
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

    this.contentService.getAllContents(params).subscribe(
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

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file && this.userId) {
      this.contentService.uploadfile(this.file, this.userId).subscribe(resp => {
        // Update the content list
        this.getContentList();

        // Reset form fields
        this.file = null;
        this.userId = null;
        this.showUploadForm = false; // Close the upload form if it's open
      });
    } else if (!this.file) {
      alert("Please select a file first");
    } else {
      alert("Please enter a user ID");
    }
  }


  toggleUploadForm() {
    this.showUploadForm = !this.showUploadForm;
  }

  downloadContent(content: any) {
    debugger
    this.contentService.downloadContent(content.contentId).subscribe(
        (response: any) => {
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
    console.log("filename:"+filename);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  deleteContent(contentId: any) {
    if (confirm('Are you sure you want to delete this content?')) {
      this.contentService.deleteContent(contentId).subscribe(
        () => {
          // Content deleted successfully, update the content list
          this.getContentList();
        },
        (error) => {
          console.error('Error occurred while deleting content:', error);
        }
      );
    }
  }
  isUser() {
    const token = localStorage.getItem('access_token');
    const jwtToken = this.authService.decodeJwtToken(token);
    const userRole = this.authService.getUserRoles(jwtToken);
    this.getUserDetails();
    if (userRole.includes('ROLE_USER')) {
      return true;
    } else return false;
  }

  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const userDetails = this.authService.getUserDetails(token);
      this.userId = parseInt(userDetails.userId,10);
      this.userName = userDetails.userName;
    }
  }
}