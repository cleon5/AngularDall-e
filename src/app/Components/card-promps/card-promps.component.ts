import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../shared/services/firestore.service';
import { StabledifusionService } from 'src/app/shared/services/stabledifusion.service';

@Component({
  selector: 'app-card-promps',
  templateUrl: './card-promps.component.html',
  styleUrls: ['./card-promps.component.sass']
})
export class CardPrompsComponent {
  @Input()  imagen!: any;
  Titulo!:String;
  img:String='';
  displayNone:boolean=false;

  constructor(private firestoreService: FirestoreService,){
    
  }
  ngOnInit() {
    this.setimg()
  }
  async setimg(){
    this.img = await this.firestoreService.getImage(this.imagen.id)
    console.log(this.img)
    this.img ? this.displayNone = true:this.displayNone = false;

  }
}
