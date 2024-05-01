import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8081';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    constructor(private http: HttpClient) { }

    addAddress(addressData: any): Observable<any> {
        console.log("--addressData----");
        console.log(addressData);
        return this.http.post(`${BASIC_URL}/api/addresses`, addressData);
    }

    getAddressById(addressId: number): Observable<any> {
        return this.http.get(`${BASIC_URL}/api/addresses/${addressId}`);
    }

    getAllAddresses(params: any): Observable<any> {
        debugger
        const userDetails = localStorage.getItem('detailsButtonClicked') === 'true';
        if (userDetails === true)
            return this.http.get(`${BASIC_URL}/api/userDetails/addresses`, { params });
        else return this.http.get(`${BASIC_URL}/api/addresses`, { params });
    }

    updateAddress(addressId: number, updatedData: any): Observable<any> {
        return this.http.put(`${BASIC_URL}/api/addresses/${addressId}`, updatedData);
    }

    deleteAddress(addressId: number): Observable<any> {
        return this.http.delete(`${BASIC_URL}/api/addresses/${addressId}`);
    }
}
