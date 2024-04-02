import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcademicInfo, Address, CmsUser, Division, Subject, District, Upazila } from '../../model/cmsUser.model';
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cmsUserService: CmsUserService // Inject the service
  ) { }

  ngOnInit(): void {
    this.cmsUserForm = this.formBuilder.group({
      cmsUserId: [''],
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      addresses: this.formBuilder.array([]), // Form array for addresses
      isActive: ['']
    });

    // Fetch the CMS user data from route resolver or service based on the ID
    this.route.params.subscribe(params => {
      const cmsUserId = +params['id']; // Assuming the parameter name is 'id'
      this.getCmsUserById(cmsUserId);
    });
  }

  getCmsUserById(cmsUserId: number): void {
    this.cmsUserService.getCmsUserById(cmsUserId).subscribe(
      (data: CmsUser) => {
        this.cmsUser = data;
        console.log(this.cmsUser);
        this.populateForm();
      },
      error => {
        console.log('Error fetching CMS user:', error);
      }
    );
  }

  // Populate form with CMS user data
  populateForm(): void {
    this.cmsUserForm.patchValue({
      cmsUserId: this.cmsUser.cmsUserId,
      userName: this.cmsUser.userName,
      mobileNumber: this.cmsUser.mobileNumber,
      email: this.cmsUser.email,
      name: this.cmsUser.name,
      gender: this.cmsUser.gender,
      userStatus: this.cmsUser.userStatus,
      isActive: this.cmsUser.isActive,
    });

    // Populate addresses form array
    this.cmsUser.addresses.forEach(address => {
      this.addresses.push(this.createAddressFormGroup(address));
    });
  }

  // Getter methods for form arrays
  get addresses() {
    return this.cmsUserForm.get('addresses') as FormArray;
  }

   // Create form group for address
   createAddressFormGroup(address: Address): FormGroup {
    return this.formBuilder.group({
      addressType: [address.addressType],
      division: this.createDivisionFormGroup(address.division),
      district: this.createDistrictFormGroup(address.district),
      upazila: this.createUpazilaFormGroup(address.upazila),
      isActive: [address.isActive]
    });
  }

  // Create form group for division
  createDivisionFormGroup(division: Division): FormGroup {
    return this.formBuilder.group({
      divisionName: [division ? division.name : '']
    });
  }

  // Create form group for district
  createDistrictFormGroup(district: District): FormGroup {
    return this.formBuilder.group({
      districtName: [district ? district.name : '']
    });
  }

  // Create form group for upazila
  createUpazilaFormGroup(upazila: Upazila): FormGroup {
    return this.formBuilder.group({
      upazilaName: [upazila ? upazila.name : '']
    });
  }

  toggleAddresses() {
    this.showAddresses = !this.showAddresses;
  }
  toggleAcademicInfos() {
    this.showAcademicInfos = !this.showAcademicInfos;
  }
}
