import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Customer} from '../model/customer';

@Injectable({
  providedIn: 'root'
})
  export class CustomerService {

  private readonly API_URL = 'http://localhost:3000/customer';
  constructor(private http: HttpClient) {}
  getCustomer(count = 10): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL).pipe(
      map(response => response.filter((get, i) => i < count))
    );
  };

  createCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.API_URL, customer);
  };

  deleteCustomer(i: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${i}`);
  }
  updateCustomer(customer: Customer,i: number): Observable<Customer> {
    return this.http.patch<Customer>(`${this.API_URL}/${i}`, customer);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${id}`);
  }
}
