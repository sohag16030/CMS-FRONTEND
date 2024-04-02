import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CmsUser, Address, District, Division, Upazila, AcademicInfo, Subject } from '../../model/cmsUser.model';
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
    private cmsUserService: CmsUserService
  ) { }

  ngOnInit(): void {
    this.cmsUserForm = this.formBuilder.group({
      cmsUserId: [''],
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      addresses: this.formBuilder.array([]),
      academicInfos: this.formBuilder.array([]),
      isActive: ['']
    });

    this.route.params.subscribe(params => {
      const cmsUserId = +params['id'];
      this.getCmsUserById(cmsUserId);
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

    this.cmsUser.addresses.forEach(address => {
      this.addresses.push(this.createAddressFormGroup(address));
      // console.log(this.addresses);
    });

    this.cmsUser.academicInfos.forEach(academicInfo => {
      this.academicInfos.push(this.createAcademicInfoFormGroup(academicInfo));
      console.log(this.academicInfos);
    });
  }

  get addresses() {
    return this.cmsUserForm.get('addresses') as FormArray;
  }

  get academicInfos() {
    return this.cmsUserForm.get('academicInfos') as FormArray;
  }

  createAddressFormGroup(address: Address): FormGroup {
    return this.formBuilder.group({
      addressType: [address.addressType],
      divisionName: [address.division ? address.division.name : ''],
      districtName: [address.district ? address.district.name : ''],
      upazilaName: [address.upazila ? address.upazila.name : ''],
      isActive: [address.isActive]
    });
  }

  createDivisionFormGroup(division: Division): FormGroup {
    return this.formBuilder.group({
      divisionName: [division ? division.name : '']
    });
  }

  createDistrictFormGroup(district: District): FormGroup {
    return this.formBuilder.group({
      districtName: [district ? district.name : '']
    });
  }

  createUpazilaFormGroup(upazila: Upazila): FormGroup {
    return this.formBuilder.group({
      upazilaName: [upazila ? upazila.name : '']
    });
  }

  createAcademicInfoFormGroup(academicInfo: AcademicInfo): FormGroup {
    const subjectFormArray = this.formBuilder.array([]);

    if (academicInfo.subjects && academicInfo.subjects.length > 0) {
      academicInfo.subjects.forEach(subject => {
        subjectFormArray.push(this.createSubjectFormGroup(subject));
      });
    }
    return this.formBuilder.group({
      academicLevel: [academicInfo.academicLevel],
      grade: [academicInfo.grade],
      academicClass: [academicInfo.academicClass],
      subjects: subjectFormArray
    });
  }

  createSubjectFormGroup(subject: Subject): FormControl<string> {
    const name = subject && subject.name ? subject.name : '';
    return this.formBuilder.control(name);
  }
  
  toggleAddresses() {
    this.showAddresses = !this.showAddresses;
  }

  toggleAcademicInfos() {
    this.showAcademicInfos = !this.showAcademicInfos;
  }
}
