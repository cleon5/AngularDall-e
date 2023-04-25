import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StabledifusionService {

  constructor(private http: HttpClient) {}
  
  public getStableDifusion(url: string, datos:any) {
    const headers = new HttpHeaders({
      "Authorization":"Token 553b574a414c15942269218e7741edc306711f18",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });
    
    //const prop = data:datos;
    return this.http.post(url,  datos, {headers:headers});
  }
  public getImage(url:any,  data:any){
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    })
    return this.http.post(url, data, {headers:headers});
  }
  public getUrl(url:any, token:string){
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization":"Token 553b574a414c15942269218e7741edc306711f18"
    });
    let output = url.urls.get;
    console.log(output.substring(29))
    return this.http.get(output.substring(29), {headers:headers})
  }
 
}
