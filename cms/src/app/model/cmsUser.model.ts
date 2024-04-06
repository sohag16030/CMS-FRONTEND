export class CmsUser {
    cmsUserId: number;
    userName: string;
    mobileNumber: string;
    email: string;
    name: string;
    gender: string;
    addresses: Address[];
    academicInfos: AcademicInfo[];
    userStatus: string;
    isActive: boolean;
  }
  
  export class Address {
    addressId : number;
    addressType: string;
    division: Division;
    district: District;
    upazila: Upazila;
    cmsUser : CmsUser;
    isActive: boolean;
  }
  
  export class Division {
    divisionId: number;
    name: string; 
  }
  
  export class District {
    districtId: number;
    name: string;
  }
  
  export class Upazila {
    upazilaId: number;
    name: string;
  }
  
  export class AcademicInfo {
    academicLevel: string;
    grade: number;
    academicClass: string;
    subjects: Subject[];
  }
  
  export class Subject {
    subjectId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  