import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-cms-user',
  templateUrl: './add-cms-user.component.html',
  styleUrl: './add-cms-user.component.css'
})
export class AddCmsUserComponent {
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
      // Now you can use formData to submit the form data to your backend or perform any other operation
      console.log(formData);
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }
}
