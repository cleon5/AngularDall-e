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
  InfoImage:any;
  constructor(
    private firestoreService: FirestoreService,
  ) {
    this.getimgs()
    this.getAll()
    //this.getImg()
  }
  async getImg(dat:any){
    this.InfoImage.map(async(i:any) => {
      let x = await this.firestoreService.getImage(i.id)
    })
  }
  async getimgs(){
    this.Imagenes=[]
    this.Imagenes =  await this.firestoreService.getImages()
  }
  async getAll(){
    let getImgs = await this.firestoreService.GetAllImages()
    this.InfoImage=getImgs;
    this.getImg(getImgs)
  }


}
