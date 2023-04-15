import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent {
  logueado:any;
  constructor(
    private authService:AuthService,
    private router: Router

    ){
    this.logueado = JSON.parse(localStorage.getItem('user')!);

    }
  signOut(){
    this.authService.SignOut()
    .then(res=>{
      console.log(res)
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/tutorial').then(() => {
          this.router.navigate(["/"]);
      });
    }).catch(err=> console.log(err))
  }
}
