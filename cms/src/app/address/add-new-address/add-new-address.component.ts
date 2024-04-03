import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { districts, divisions, upazilas } from '../../model/address-data';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {
  addressForm: FormGroup;
  divisions = divisions;
  districts = districts;
  upazilas = upazilas;

  constructor(private formBuilder: FormBuilder, private addressService: AddressService) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      addressType: ['PERMANENT', Validators.required],
      divisionId: ['', Validators.required],
      districtId: ['', Validators.required],
      upazilaId: ['', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
      this.addressService.addAddress(formData).subscribe(
        response => {
          console.log('Address added successfully:', response);
          // Optionally, you can reset the form after successful submission
          this.addressForm.reset();
        },
        error => {
          console.error('Error adding address:', error);
          // Handle errors, e.g., show an error message to the user
        }
      );
    } else {
      // Form is invalid, do something (e.g., show error messages)
    }
  }
}
