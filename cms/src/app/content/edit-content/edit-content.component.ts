import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.css'
})

export class EditContentComponent {
  file: File = null;
  contentList: any[] = [];
  filterTitle: string = ''; // Default filter value
  pageNumber: number = 0;
  numberOfPages: number = 0;
  pageSize: number = 3;
  sortField: string = 'contentId';
  sortOrder: string = 'ASC';
  userName: string;

  constructor(
    public dialogRef: MatDialogRef<EditContentComponent>,
    private contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  upload(): void {
    debugger
    this.contentService.updateContent(this.data.contentId, this.file)
      .subscribe(
        (response) => {
          debugger
          console.log('Content updated successfully:', response);
          this.dialogRef.close();
          this.router.navigateByUrl('/Contents', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/Contents']);
          });
        },
        (error) => {
          console.error('Error occurred while updating content:', error);
        }
      );
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
}
