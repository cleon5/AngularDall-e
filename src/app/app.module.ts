import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './View/home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { PerfilComponent } from './View/perfil/perfil.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CrearComponent } from './View/crear/crear.component';
import { CardPrompsComponent } from './Components/card-promps/card-promps.component';
import { TutorialComponent } from './View/tutorial/tutorial.component';
import { CrearStableDiffusionComponent } from './View/crear-stable-diffusion/crear-stable-diffusion.component';

import { ReplicateService } from './shared/services/replicate.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    PerfilComponent,
    CrearComponent,
    CardPrompsComponent,
    TutorialComponent,
    CrearStableDiffusionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthService, ReplicateService,
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
