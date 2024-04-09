import { Component } from '@angular/core';
import { ContentService } from '../../services/content.service';

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

  constructor(private contentService: ContentService) {}

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


  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file && this.userId) { 
      this.contentService.uploadfile(this.file, this.userId).subscribe(resp => {
        alert("Uploaded");
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
}