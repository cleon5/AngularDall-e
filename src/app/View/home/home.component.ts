import { Component } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { StabledifusionService } from 'src/app/shared/services/stabledifusion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  Imagenes:any;
  constructor(
    private RestService: RestService,
    private firestoreService: FirestoreService,
    private StableDifussion: StabledifusionService
  ) {
    this.getAll()
    //this.firestoreService.AgregarImagen("res");
  }

  async getAll(){
    let getImgs = await this.firestoreService.GetAllImages()
    this.Imagenes=getImgs;
    console.log(getImgs)
  }


}
