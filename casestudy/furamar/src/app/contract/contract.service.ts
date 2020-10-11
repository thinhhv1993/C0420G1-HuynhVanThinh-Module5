import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Contract} from '../model/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private readonly API_URL = 'http://localhost:3000/contract';
  constructor(private http: HttpClient) {}
  getContract(count = 10): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.API_URL).pipe(
      map(response => response.filter((get, i) => i < count))
    );
  };

  createContract(contract: Partial<Contract>): Observable<Contract> {
    return this.http.post<Contract>(this.API_URL, contract);
  };

  deleteContract(i: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${i}`);
  }
  updateContract(contract: Contract,i: number): Observable<Contract> {
    return this.http.patch<Contract>(`${this.API_URL}/${i}`, contract);
  }
}
