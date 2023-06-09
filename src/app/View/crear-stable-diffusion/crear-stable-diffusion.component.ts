import { Component, OnInit  } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { StabledifusionService } from 'src/app/shared/services/stabledifusion.service';
import { FirestoreService } from '../../shared/services/firestore.service';
//import { ApiRestService } from 'src/app/shared/services/api-rest.service';
//import {ReplicateService } from "src/app/shared/services/replicate.service"
//import {asa} from "../../../environments/index"
//import { PruebaService } from 'src/app/shared/services/prueba.service';

@Component({
  selector: 'app-crear-stable-diffusion',
  templateUrl: './crear-stable-diffusion.component.html',
  styleUrls: ['./crear-stable-diffusion.component.sass'],
})
export class CrearStableDiffusionComponent {
  promp: string = '';
  negativePromp: string = '';
  medidas: string = '1024x1024';
  Token: string = '';
  apiHost: string = 'openai80.p.rapidapi.com';
  img:any;
  responseSableDifusion: any = {
    status: 'success',
    generationTime: 1.0769741535186768,
    id: 12777029,
    output: [
      'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/3727094c-a37f-48b5-8f8a-8bb75db3b637-0.png',
    ],
    meta: {
      H: 512,
      W: 512,
      enable_attention_slicing: 'true',
      file_prefix: '3727094c-a37f-48b5-8f8a-8bb75db3b637',
      guidance_scale: 7.5,
      model: 'runwayml/stable-diffusion-v1-5',
      n_samples: 1,
      negative_prompt:
        '((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime ((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs))',
      outdir: 'out',
      prompt:
        'ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)), blue eyes, shaved side haircut, hyper detail, cinematic lighting, magic neon, dark red city, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K DSLR photography, sharp focus, Unreal Engine 5, Octane Render, Redshift, ((cinematic lighting)), f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame',
      revision: 'fp16',
      safetychecker: 'no',
      seed: 3331968503,
      steps: 20,
      vae: 'stabilityai/sd-vae-ft-mse',
    },
  };
  response: any = {
    created: 1681268637,
    data: [{ url: '../../assets/123.jpg' }],
  };
  user: any;
  constructor(
    private RestService: StabledifusionService,
    //rprivate apoi:ApiRestService,
    private firestoreService: FirestoreService,
  ) {    
  }

 
  async getdata() {
    this.user = await this.firestoreService.getUser();
    console.log(this.user);
    //this.RapidAPI = this.user.apyKey;
  }

  Generar() {
    let prompt = {
      "version":"db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      "input":{
            "guidance_scale":7.5,
            "image_dimensions":"512x512",
            "negative_prompt":this.negativePromp,
            "num_inference_steps":50,
            "num_outputs": 1,
            "prompt":this.promp,
            "scheduler":"K_EULER"
      }  
    };

    this.RestService.getStableDifusion(
      'predictions',
      prompt,
      "a"
    ).subscribe((resp) => {
      console.log(resp)
      setTimeout(() => {
        console.log("1 Segundo esperado")
        this.RestService.getUrl(resp, this.Token).subscribe(res =>{
        console.log(res)
        this.responseSableDifusion = res;
      })
      }, 8000);
      
      //this.firestoreService.actualizar(this.RapidAPI);
      //this.response = resp;
    });
  }
  Generar2() {
    let prompt = {
      guidance_scale: 7.5,
      image_dimensions: '512x512',
      negative_prompt: this.negativePromp,
      num_inference_steps: 50,
      num_outputs: 1,
      prompt: this.promp,
      scheduler: 'K_EULER',
      seed: 111111,
    };

    this.RestService.getStableDifusion(
      'https://replicate.com/api/models/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf/predictions',
      prompt,"a"
    ).subscribe((resp) => {
      //this.firestoreService.actualizar(this.RapidAPI);
      this.response = resp;
    });
  }
}
