import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  public get(url: string) {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'cb467d16f3msh3f8fb60e3b94a3dp12b1b8jsn48209caee58e',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'

    });

    return this.http.get(url, {headers:headers});
  }
}
