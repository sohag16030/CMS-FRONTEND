import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsUserService } from '../../services/cmsuser.service';


@Component({
  selector: 'app-edit-cms-user',
  templateUrl: './edit-cms-user.component.html',
  styleUrls: ['./edit-cms-user.component.css']
})
export class EditCmsUserComponent implements OnInit {
  cmsUserForm: FormGroup;
  cmsUserId: number;

  constructor(
    private formBuilder: FormBuilder,
    private cmsUserService: CmsUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cmsUserForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]], 
      email: ['', [Validators.required,Validators.email]],
      name: ['', [Validators.required]],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cmsUserId = parseInt(params['cmsUserId']);
      this.getCmsUser(this.cmsUserId);
    });
  }

  getCmsUser(cmsUserId: number): void {
    this.cmsUserService.getCmsUserById(cmsUserId).subscribe(
      (cmsUser: any) => {
        // Patch the fetched CMSUser details to the form controls
        this.cmsUserForm.patchValue({
          userName: cmsUser.userName,
          mobileNumber: cmsUser.mobileNumber,
          email: cmsUser.email,
          name: cmsUser.name,
          gender: cmsUser.gender
        });
      },
      (error) => {
        console.error('Error occurred while fetching CMSUser details for editing:', error);
      }
    );
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

      this.cmsUserService.updateCmsUser(this.cmsUserId,formData).subscribe(
        (response) => {
          console.log('Successfully saved:', response);
          this.cmsUserForm.reset();
          this.router.navigate([`/CmsUsers/CmsUser/${this.cmsUserId}`]);
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
