import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Service} from '../model/service';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly API_URL = 'http://localhost:3000/service';
  constructor(private http: HttpClient) {}
  getService(count = 10): Observable<Service[]> {
    return this.http.get<Service[]>(this.API_URL).pipe(
      map(response => response.filter((get, i) => i < count))
    );
  };

  createService(service: Partial<Service>): Observable<Service> {
    return this.http.post<Service>(this.API_URL, service);
  };

  deleteService(i: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${i}`);
  }
  updateService(service: Service,i: number): Observable<Service> {
    return this.http.patch<Service>(`${this.API_URL}/${i}`, service);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.API_URL}/${id}`);
  }

  searchByServiceName(serviceName: string): Observable<Service[]>{
    return this.http.get<Service[]>(this.API_URL+ "?serviceName_like=" + serviceName);
  }
}
