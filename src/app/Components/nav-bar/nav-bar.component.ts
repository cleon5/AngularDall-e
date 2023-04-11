import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent {
  constructor(
    private authService:AuthService
    ){}
  signOut(){
    this.authService.SignOut()
    .then(res=>{
      console.log(res)
    }).catch(err=> console.log(err))
  }
}
