import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { districts, divisions, upazilas } from '../../model/address-data';
import { Address } from '../../model/cmsuser.model';
import { Router } from '@angular/router';

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
  cmsUserIds: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // Array from 1 to 10

  constructor(private formBuilder: FormBuilder, private addressService: AddressService, private router: Router) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      addressType: ['', Validators.required],
      divisionId: ['', Validators.required],
      districtId: ['', Validators.required],
      upazilaId: ['', Validators.required],
      cmsUserId: ['', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
      console.log("called");
      console.log(formData);
      // Construct Address model object
      const address: Address = {
        addressId: null,
        addressType: formData.addressType,
        division: {
          divisionId: formData.divisionId,
          name: null // Set name field to null
        },
        district: {
          districtId: formData.districtId,
          name: null // Set name field to null
        },
        upazila: {
          upazilaId: formData.upazilaId,
          name: null // Set name field to null
        },
        cmsUser: {
          cmsUserId: formData.cmsUserId,
          userName: null,
          mobileNumber: null,
          email: null,
          name: null,
          gender: null,
          addresses: null,
          academicInfos: null,
          userStatus: null,
          isActive: true
        },
        isActive: formData.isActive
      };


      console.log(address);

      // Call the service with the Address object
      this.addressService.addAddress(address).subscribe(
        response => {
          console.log('Address added successfully:', response);
          // Optionally, you can reset the form after successful submission
          this.addressForm.reset();
          this.router.navigate(['/Addresses']);
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
