import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8081/api';

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(private httpClient: HttpClient) { }

    public uploadfile(file: File, userId: number): Observable<any> {
        let formParams = new FormData();
        formParams.append('contents', file);
        return this.httpClient.post(`${BASIC_URL}/contents/${userId}`, formParams);
    }

    getAllContents(params: any): Observable<any> {
        console.log(params);
        return this.httpClient.get(`${BASIC_URL}/contents`, { params });
    }
    
}
