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
  RapidAPI: string = 'cb467d16f3msh3f8fb60e3b94a3dp12b1b8jsn48209caee58e';
  response:any ={"created":1681268637,"data":[{"url":"https://oaidalleapiprodscus.blob.core.windows.net/private/org-3PqyQYra9LvRBGRfWOtjNN7f/user-OQ7jGQ6LMuEE8JALwQ9A4lMI/img-Ox7UzIdXCnRJ2cJVsMdLzHxY.png?st=2023-04-12T02%3A46%3A07Z&se=2023-04-12T04%3A46%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-12T00%3A20%3A27Z&ske=2023-04-13T00%3A20%3A27Z&sks=b&skv=2021-08-06&sig=IMaJZhe7/SZt5yE7DtT2dLolrhTMMaEAPTGkXu81H5k%3D"}]}
  Generar() {
    let prompt = {"prompt":this.promp, "n":1,"size":this.medidas}
    console.log()
    this.RestService.get(
      'https://openai80.p.rapidapi.com/images/generations', prompt).subscribe((resp) => {
      console.log(resp);
      this.response= resp
    });
  }
}
