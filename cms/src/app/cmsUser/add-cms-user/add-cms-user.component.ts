import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CmsUserService } from '../../services/cmsuser.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-add-cms-user',
  templateUrl: './add-cms-user.component.html',
  styleUrls: ['./add-cms-user.component.css']
})
export class AddCmsUserComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cmsUserService: CmsUserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      userName: [null, Validators.required, this.noSpaceAllowed],
      roles: [null, Validators.required, this.noSpaceAllowed],
      password: [null, Validators.required, this.noSpaceAllowed],
      mobileNumber: [null, Validators.required, this.numericOnly],
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      gender: ['', Validators.required]
    });
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

  numericOnly(control: AbstractControl): Promise<ValidationErrors | null> {

    return new Promise((resolve) => {
      if (control.value !== null && !/^\d+$/.test(control.value)) {
        resolve({ numericOnly: true });
      } else {
        resolve(null);
      }
    });
  }
  onSubmit() {
    if (this.reactiveForm.valid) {

      const formData = this.reactiveForm.value;
      this.cmsUserService.addCmsUser(formData).subscribe(
        (response) => {
          console.log('Successfully saved:', response);
          this.reactiveForm.reset();
          debugger
          if (this.isAdmin())
            this.router.navigate(['/CmsUsers']);
          else if (!this.isAdmin()) {
            debugger
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.error('Error occurred while saving:', error);
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }

  isAdmin() {
    debugger
    const token = localStorage.getItem('access_token');
    if(token===null) return false;
    const jwtToken = this.authService.decodeJwtToken(token);
    const userRole = this.authService.getUserRoles(jwtToken);
    if (userRole.includes('ROLE_ADMIN')) {
      return true;
    } else return false;
  }
}
