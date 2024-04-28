import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsUser } from '../../model/cmsuser.model';
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
  cmsUserId: number;
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cmsUserService: CmsUserService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.cmsUserForm = this.formBuilder.group({
      userName: [null, Validators.required, this.noSpaceAllowed],
      password: [null, Validators.required, this.noSpaceAllowed],
      mobileNumber: [null, Validators.required, this.noSpaceAllowed],
      email: [null, [Validators.required, Validators.email]], // Fixed here
      name: [null, Validators.required],
      gender: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.cmsUserForm = this.formBuilder.group({
      cmsUserId: [''],
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      addresses: this.formBuilder.array([]),
      academicInfos: this.formBuilder.array([]),
      isActive: ['']
    });

    this.route.params.subscribe(params => {
      this.cmsUserId = +params['id'];
      this.getCmsUserById(this.cmsUserId);
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

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    // Reset form validation status when switching between readonly and editable mode
    if (!this.editMode) {
      this.cmsUserForm.markAsPristine();
    }
  }
  noSpaceAllowed(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      if (control.value !== null && control.value.indexOf(' ') !== -1) {
        resolve({ noSpaceAllowed: true });
      } else {
        resolve(null);
      }
    });
  }

  onSubmit() {
    debugger
    if (this.cmsUserForm.valid) {
      const formData = this.cmsUserForm.value;

      this.cmsUserService.updateCmsUser(this.cmsUserId, formData).subscribe(
        (response) => {
          console.log('Successfully saved:', response);
          this.editMode = false;
          this.ngZone.run(() => {
            this.router.navigate([`/CmsUsers/CmsUser/${this.cmsUserId}`]);
          });
        },
        (error) => {
          console.error('Error occurred while saving:', error);
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }

}
