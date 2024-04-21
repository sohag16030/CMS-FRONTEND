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
        const formParams = new FormData();
        formParams.append('contents', file);
        return this.httpClient.post(`${BASIC_URL}/contents/${userId}`, formParams);
    }

    getAllContents(params: any): Observable<any> {
        return this.httpClient.get(`${BASIC_URL}/contents`, { params });
    }

    downloadContent(contentId: number): Observable<any> {
        // Return the observable directly
        return this.httpClient.get(`${BASIC_URL}/contents/download/${contentId}`, {
            responseType: 'blob', // Ensure response type is set to blob
            observe: 'response'   // Observe the full HTTP response to access headers
        });
    }

    deleteContent(contentId: number): Observable<any> {
        return this.httpClient.delete(`${BASIC_URL}/contents/${contentId}`);
    }

    updateContent(contentId: number, newData: any): Observable<any> {
        const formParams = new FormData();
        formParams.append('contents', newData); // Assuming newData is a file
        return this.httpClient.put(`${BASIC_URL}/contents/${contentId}`, formParams);
      }
      
}
