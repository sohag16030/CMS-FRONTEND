import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CmsUser} from '../../model/cmsuser.model';
import { CmsUserService } from '../../services/cmsuser.service';


@Component({
  selector: 'app-details-cms-user',
  templateUrl: './details-cms-user.component.html',
  styleUrls: ['./details-cms-user.component.css']
})
export class DetailsCmsUserComponent implements OnInit {

  cmsUserForm: FormGroup;
  cmsUser: CmsUser;
  showAddresses: boolean = false;
  showAcademicInfos: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cmsUserService: CmsUserService
  ) { }

  ngOnInit(): void {
    this.cmsUserForm = this.formBuilder.group({
      cmsUserId: [''],
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      addresses: this.formBuilder.array([]),
      academicInfos: this.formBuilder.array([]),
      isActive: ['']
    });

    this.route.params.subscribe(params => {
      const cmsUserId = +params['id'];
      this.getCmsUserById(cmsUserId);
    });
  }

  getCmsUserById(cmsUserId: number): void {
    this.cmsUserService.getCmsUserById(cmsUserId).subscribe(
      (data: CmsUser) => {
        this.cmsUser = data;
        this.populateForm();
      },
      error => {
        console.log('Error fetching CMS user:', error);
      }
    );
  }

  populateForm(): void {
    this.cmsUserForm.patchValue({
      cmsUserId: this.cmsUser.cmsUserId,
      userName: this.cmsUser.userName,
      mobileNumber: this.cmsUser.mobileNumber,
      email: this.cmsUser.email,
      name: this.cmsUser.name,
      gender: this.cmsUser.gender,
      isActive: this.cmsUser.isActive,
    });
  }

}
