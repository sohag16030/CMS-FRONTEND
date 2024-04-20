import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { districts, divisions, upazilas } from '../../model/address-data';
import { Address } from '../../model/cmsuser.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  userId: string;
  userName: string;

  constructor(private formBuilder: FormBuilder, private addressService: AddressService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      addressType: ['', Validators.required],
      divisionId: ['', Validators.required],
      districtId: ['', Validators.required],
      upazilaId: ['', Validators.required],
      cmsUserId: [null, this.isAdmin() ? Validators.required : null],
      isActive: [true, Validators.required]
    });
    this.isAdmin();
    this.getUserDetails();
  }
  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const userDetails = this.authService.getUserDetails(token);
      this.userId = userDetails.userId;
      this.userName = userDetails.userName;
    }
  }
  onSubmit(): void {
    debugger
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
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
      if (!this.isAdmin()) {
        debugger
        address.cmsUser.cmsUserId = parseInt(this.userId, 10);
      }
        this.addressService.addAddress(address).subscribe(
          response => {
            console.log('Address added successfully:', response);
            // Optionally, you can reset the form after successful submission
            this.addressForm.reset();
            this.router.navigate(['/Addresses']);
          },
          error => {
            debugger
            console.error('Error adding address:', error);
          }
        );
    }
  }  
  isAdmin() {
    const token = localStorage.getItem('access_token');
    const jwtToken = this.authService.decodeJwtToken(token);
    const userRole = this.authService.getUserRoles(jwtToken);
    if (userRole.includes('ROLE_ADMIN')) {
      return true;
    } else return false;
  }
}
