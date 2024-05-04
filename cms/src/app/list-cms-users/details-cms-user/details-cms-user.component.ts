import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsUser } from '../../model/cmsuser.model';
import { CmsUserService } from '../../services/cmsuser.service';
import { AuthService } from '../../services/auth.service';


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
  userName: string;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cmsUserService: CmsUserService,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.cmsUserForm = this.formBuilder.group({
      userName: [null],
      password: [null],
      mobileNumber: [null],
      email: [null],
      name: [null],
      gender: [null]
    });
  }

  ngOnInit(): void {
    this.cmsUserForm = this.formBuilder.group({
      userName: [null, Validators.required,this.noSpaceAllowed],
      mobileNumber: [null, Validators.required, this.numericOnly],
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      gender: ['', Validators.required]
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
  numericOnly(control: AbstractControl): Promise<ValidationErrors | null>{

    return new Promise((resolve) => {
      if (control.value !== null && !/^\d+$/.test(control.value)) {
        resolve({ numericOnly: true });
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
  cancelled(cmsUserId: number): void{
    debugger
    this.getCmsUserById(cmsUserId);
    this.editMode=false;
  }

  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const userDetails = this.authService.getUserDetails(token);
      this.userId = parseInt(userDetails.userId, 10);
      this.userName = userDetails.userName;
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
}
