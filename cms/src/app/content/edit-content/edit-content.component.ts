import { Component } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.css'
})
export class EditContentComponent {
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

  constructor(private contentService: ContentService, private router: Router,private authService: AuthService,public dialog: MatDialog) { }

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

  openEditModal(content: any): void {
    const dialogRef = this.dialog.open(EditContentComponent, {
      width: '600px',
      data: { contentId: content.contentId, contentData: content }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle any result here if needed
    });
  }
}
