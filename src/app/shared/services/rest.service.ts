import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  public get(url: string, datos:any, apikey:string, apiHost:string) {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': apikey,
      'X-RapidAPI-Host': apiHost

    });
    
    //const prop = data:datos;
    return this.http.post(url,  {data:datos}, {headers:headers});
  }
}
