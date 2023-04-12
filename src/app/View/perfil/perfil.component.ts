import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RestService } from '../../shared/services/rest.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass'],
})
export class PerfilComponent {
  isOpen = false;
  nombre: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private RestService: RestService,
    private router: Router
  ) {}
  ngOnInit() {
   
  }
  registrar() {
    this.authService
      .register(this.correo, this.password)
      .then((Response) => {
        console.log(Response);
      })
      .catch((err) => console.log(err));
  }
  login() {
    this.authService
      .login(this.correo, this.password)
      .then((Response) => {
        console.log(Response);
        this.router.navigate(['/']);
      })
      .catch((err) => console.log(err));
  }
  Google() {
    this.authService
      .GoogleLogin()
      .then((Response) => {
        //this.authService.setUserData(Response)
        console.log(Response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  open() {
    this.correo = '';
    this.password = '';
    this.isOpen = !this.isOpen;
    this.authService.actualizar('ejemplo api');
  }
}
