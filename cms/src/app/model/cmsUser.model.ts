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
    addressType: string;
    division: Division;
    district: District;
    upazila: Upazila;
    isActive: boolean;
  }
  
  export class Division {
    divisionId: number;
    name: string; 
    active: boolean;
  }
  
  export class District {
    districtId: number;
    name: string;
    active: boolean;
  }
  
  export class Upazila {
    upazilaId: number;
    name: string;
    active: boolean;
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
  