import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StabledifusionService {

  constructor(private http: HttpClient) {}
  
  public getStableDifusion(url: string, datos:any) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'http://localhost:4200',
      "Access-Control-Allow-Methods": "POST"

    });
    
    //const prop = data:datos;
    return this.http.post(url,  {data:datos}, {headers:headers});
  }
}
