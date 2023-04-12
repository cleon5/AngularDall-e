import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './View/home/home.component';
import { PerfilComponent } from './View/perfil/perfil.component';
import { CrearComponent } from './View/crear/crear.component';
import { TutorialComponent } from './View/tutorial/tutorial.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"perfil", component:PerfilComponent},
  {path:"crear", component:CrearComponent},
  {path:"tutorial", component:TutorialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
