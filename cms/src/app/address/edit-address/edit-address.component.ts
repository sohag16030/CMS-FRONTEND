import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup
import { Address } from '../../model/cmsUser.model';
import { districts, divisions, upazilas } from '../../model/address-data';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  addressForm: FormGroup;
  addressId: number;
  divisions = divisions;
  districts = districts;
  upazilas = upazilas;

  cmsUserIds: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // Array from 1 to 10

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.addressForm = this.formBuilder.group({
      // Initialize form controls
      addressType: [''],
      divisionId: [''],
      districtId: [''],
      upazilaId: [''],
      cmsUserId: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.addressId = parseInt(params['addressId']);
      this.getAddress(this.addressId);
    });
  }

  getAddress(addressId: number) {
    this.addressService.getAddressById(addressId).subscribe(
      (address: any) => {
        console.log(address);
        // Patch the fetched address details to the form controls
        this.addressForm.patchValue({
          addressId : this.addressId,
          addressType: address.addressType,
          divisionId: address.division.divisionId,
          districtId: address.district.districtId,
          upazilaId: address.upazila.upazilaId
        });
      },
      (error) => {
        console.error('Error occurred while fetching address details for editing:', error);
      }
    );
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
      console.log("I am here now");
      console.log(formData);
      // Construct Address model object
      const address: Address = {
        addressId : this.addressId,
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

      this.addressService.updateAddress(this.addressId,address).subscribe(
        response => {
          console.log('Address updated successfully:', response);
          this.addressForm.reset();
          this.router.navigate(['/Addresses']);
        },
        error => {
          console.error('Error updating address:', error);
        }
      );
    } else {
      // Form is invalid, do something (e.g., show error messages)
    }
  }
}
