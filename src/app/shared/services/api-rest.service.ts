import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  constructor(private http: HttpClient) { }

  getGreeting(): Observable<any> {
    return this.http.get<any>('https://api.replicate.com/v1/predictions');
  }

}
