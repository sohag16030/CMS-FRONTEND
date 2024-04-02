import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8081';

@Injectable({
    providedIn: 'root'
})
export class CmsUserService {

    constructor(private http: HttpClient) { }

    addCmsUser(cmsUserData: any): Observable<any> {
        return this.http.post(`${BASIC_URL}/api/cmsUsers`, cmsUserData);
    }

    getCmsUserById(cmsUserId: number): Observable<any> {
        return this.http.get(`${BASIC_URL}/api/cmsUsers/${cmsUserId}`);
    }

    getAllCmsUsers(params: any): Observable<any> {
        console.log(params);
        return this.http.get(`${BASIC_URL}/api/cmsUsers`, { params });
    }

    updateCmsUser(cmsUserId: number, updatedData: any): Observable<any> {
        console.log("update service is called");
        return this.http.put(`${BASIC_URL}/api/cmsUsers/${cmsUserId}`, updatedData);
    }

    deleteCmsUser(cmsUserId: number): Observable<any> {
        return this.http.delete(`${BASIC_URL}/api/cmsUsers/${cmsUserId}`);
    }
}
