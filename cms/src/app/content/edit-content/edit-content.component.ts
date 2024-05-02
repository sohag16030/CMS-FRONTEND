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

          // need to load the page to show the updated data
          this.reloadCurrentRoute();
        },
        (error) => {
          console.error('Error occurred while updating content:', error);
        }
      );
  }
  private reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
  cancel(){
    this.dialogRef.close();
  }

}
