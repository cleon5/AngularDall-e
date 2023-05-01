import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-promps',
  templateUrl: './card-promps.component.html',
  styleUrls: ['./card-promps.component.sass']
})
export class CardPrompsComponent {
  @Input()  imagen!: any;


  constructor(private readonly router: Router){
    
  }
  setimg(imagen:any){
    
  }
}
