import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsUserService } from '../services/cmsuser.service';
import { Router } from '@angular/router';


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
    private router: Router
  ) { } // Inject CmsUserService

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      gender: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;
      this.cmsUserService.addCmsUser(formData).subscribe(
        (response) => {
          console.log('Successfully saved:', response);
          this.reactiveForm.reset();
          this.router.navigate(['/']);
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
