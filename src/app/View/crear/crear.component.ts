import { Component } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.sass'],
})
export class CrearComponent {
  constructor(private RestService: RestService) {}
  promp: string = '';
  medidas: string = '1024x1024';
  RapidAPI: string = '';
  apiHost: string = '';
  response:any ={"created":1681268637,"data":[{"url":"../../assets/123.jpg"}]}
  Generar() {
    let prompt = {"prompt":this.promp, "n":1,"size":this.medidas}
    console.log()
    this.RestService.get(
      'https://openai80.p.rapidapi.com/images/generations', prompt, this.RapidAPI, this.apiHost).subscribe((resp) => {
      //console.log(resp);
      this.response= resp
    });
  }
}
