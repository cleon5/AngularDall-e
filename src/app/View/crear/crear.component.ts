import { Component } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { FirestoreService } from '../../shared/services/firestore.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.sass'],
})
export class CrearComponent {
  promp: string = '';
  medidas: string = '1024x1024';
  RapidAPI: string = '';
  apiHost: string = 'openai80.p.rapidapi.com';
  response:any ={"created":1681268637,"data":[{"url":"../../assets/123.jpg"}]}
  user:any;
  constructor(private RestService: RestService, private firestoreService: FirestoreService) {
   this.getdata()
  }
  async getdata(){
    this.user =  await this.firestoreService.getUser()
    console.log(this.user) 
    this.RapidAPI = this.user.apyKey;
  }

  Generar() {
    let prompt = {"prompt":this.promp, "n":1,"size":this.medidas}
    console.log()
    this.RestService.get(
      'https://openai80.p.rapidapi.com/images/generations', prompt, this.RapidAPI, this.apiHost).subscribe((resp) => {
      this.firestoreService.actualizar(this.RapidAPI)
      this.response= resp
    });
  }
}
