import { Component } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { StabledifusionService } from 'src/app/shared/services/stabledifusion.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.sass'],
})
export class CrearComponent {
  promp: string = '';
  swicht: boolean = false;
  negativePromp: string = '';
  Token: string = '';
  Seed: any = null;
  H: number = 512;
  W: number = 512;
  Guidance_scale: number = 7.5;
  scheduler: string = 'K_EULER';
  Num_inference_steps: number = 50;

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

  medidas: string = '1024x1024';
  RapidAPI: string = '';
  apiHost: string = 'openai80.p.rapidapi.com';
  responseSD: any;
  modalShow:boolean =false;
  response: any = {
    created: 1681268637,
    data: [{ url: '../../assets/123.jpg' }],
  };
  user: any;
  decode64:String="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMFBMVEX////7+/vr6+vNzc2qqqplywBWrQD/Y5T/JTf+AADmAABeeEQvNydqAAAGBAMAAAGoF14oAAAEBUlEQVR42u2WTUwUVxzA/2925LIojsyqCLtMqSQeFJeFROPHstjdNkZdkaiX9mRTovYgSYNFE43Rg5IeNG5SqyaVcGzXkvTm7hZWq9bKriAYYzSLBI3WAplp0jY2kV3fzPuYGcBxD/bmO0zevPeb//f7v0FQ5EDvwf8LFG89ixYDol9Wo+smKal2sHF6kM6q7qbE5tY03d7SHR6ygiuvwY1txkzIlPaD3NQ4Zryk/PCP1wKibBlI97dq+idXUxqgcEkVnruS/smRpuWaCbrHU5pc/wyTQsata0U77wVBTlRP9UNkT9oE61K9AHL9VERbeTVurMjNm54mqrFw8CwKmWBfpf6V2Dx/TdxN3YjMf2JwIEZ8JnjnEbEjvLAQZ1EKlxkciJ9UcdD1Z5ztDmgsgPIrMkWtMgfd41xOYXZOIjUcLB3tdchypHWIgb5k2gH0nE0zMHjRCRTLWxgY/VQrDuybcAQ/DDEwmwEn8COlSDBcTUE0GXcEjRzqoDDhDH7sfccg2szAt9hogjBFQFRmDyd9N1VTEFegXXKEVKQFJHEUd0DSKhLthIm0HSQpnNdCNizgq147GP0m7QTygNMye6NqM9ekwlG4kLI5I4cMZ+bVhMA8MwX1rw9oIjakAYX6jXlBRRJ4BF6PwmRSfQyLFhJwWy/IG8khKuirljODG0DfGAd3qCBNEol5vCqFAxqYLeUyB0H2A2Q0DspRD3BQfJEc5KBl6KprG6pNEPqqfkKzOQBsha2bQeVw6g3nSySaGYgb99ylhsLDLVYQ3E+oozOGHKzVbCBs+HkuUm6ivd4E0ZYeNTPTTrn51+0wA9TJgpZVLeaV1y+4yS8c64W0/AcFTBCHK/fFEMwFAmo4KRldE0ZxsF8cGbTuzYqHtOz8t6e8TMk5CcjNSC+kdcfgPyag9AoDhUQARmvAcIiAW3v0JzWJg64BJXdBQ21+/b4zwMqRW5dA2h3I7+onYJd+Y4i3FbyMxz4hxE7hS2MBdSq6Fgq6Bny/dxv6Sk76COj6Yz91ZG8dToQ7oYNCqu4QjX9FK5UoPt/PXO701mruhwcxGP2ecahzzxBtUtlzLHclsXtBA6wc+a2brlUc8TCvg5cPM7LiaOPT8Y4ub3bpAbqy+MQ18xRmvIe5nr83YXDt8Nca0/GveWniSHByybEVwx1dD1ccYB/6yF8DTaGcYLFA391o6DjjohaWfKXQ/xCWazmhPDhNbYf2WH4fse9zhRUkLwrXlUD+9iVD5HR77KWheclxkqsZ1bM+pqcWZ2xVe0zXjPb6pyO8IK1l5trcA7mLKuo48+VpQG0BuPmZeTbs9Vi+9oQyqv6Ieyou4FybU+HqRS4o+TH1VG7MvgFFjvfguwFfA4FobmCxcnTPAAAAAElFTkSuQmCC";
  constructor(
    private RestService: RestService,
    private firestoreService: FirestoreService,
    private StableDifussion: StabledifusionService
  ) {
    this.getdata();
    //this.firestoreService.AgregarImagen("res");
  }
  changeSwicht() {
    this.swicht = !this.swicht;
  }
  ShowModal(){
    this.modalShow = !this.modalShow;
  }
  ImagenStablediffusion() {
    let dataSD = {
      key: this.Token,
      prompt: this.promp,
      negative_prompt: this.negativePromp,
      width: this.W,
      height: this.H,
      samples: '1',
      num_inference_steps: this.Num_inference_steps,
      safety_checker: 'no',
      enhance_prompt: 'yes',
      seed: this.Seed,
      guidance_scale: this.Guidance_scale,
      webhook: null,
      track_id: null,
    };

    this.StableDifussion.getImage(
      'https://stablediffusionapi.com/api/v3/text2img',
      dataSD
    ).subscribe((resp) => {
      this.responseSableDifusion = resp;
    });
  }
  setResp(resp: any) {
    this.responseSD = {
      completed_at: resp.completed_at,
      created_at: resp.created_at,
      error: resp.error,
      id: resp.id,
      input: resp.input,
      logs: resp.logs,
      metrics: resp.metrics,
      output: resp.output,
      started_at: resp.started_at,
      status: resp.status,
      urls: resp.urls,
      version: resp.version,
      webhook_completed: resp.webhook_completed,
    };
  }
  Comprobar() {}
  GenerarStableDifussion() {
    let prompt = {
      version:
        'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      input: {
        guidance_scale: 7.5,
        image_dimensions: '512x512',
        negative_prompt: this.negativePromp,
        num_inference_steps: 50,
        num_outputs: 1,
        prompt: this.promp,
        scheduler: 'K_EULER',
      },
    };

    this.StableDifussion.getStableDifusion(
      'predictions',
      prompt,
      this.Token
    ).subscribe((resp) => {
      this.setResp(resp);
      setTimeout(() => {
        this.RecursiveAwait(resp)
      }, 10000);
    })
  }

  RecursiveAwait(resp : any){
    this.StableDifussion.getUrl(resp, this.Token).subscribe((res:any) => {
      if(res.completed_at != null){
        console.log(res)
        this.firestoreService.TokenAdd(this.Token);
        this.responseSableDifusion = res;
        this.ShowModal();
      }
      else{
        setTimeout(() => {
          this.RecursiveAwait(resp)
        }, 1000);
      }
      
    });
  }
  
  async getdata() {
    this.user = await this.firestoreService.getUser();
    this.RapidAPI = this.user.apyKey;
    this.Token = this.user.Token;
  }
  getBase64Img() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMFBMVEX////7+/vr6+vNzc2qqqplywBWrQD/Y5T/JTf+AADmAABeeEQvNydqAAAGBAMAAAGoF14oAAAEBUlEQVR42u2WTUwUVxzA/2925LIojsyqCLtMqSQeFJeFROPHstjdNkZdkaiX9mRTovYgSYNFE43Rg5IeNG5SqyaVcGzXkvTm7hZWq9bKriAYYzSLBI3WAplp0jY2kV3fzPuYGcBxD/bmO0zevPeb//f7v0FQ5EDvwf8LFG89ixYDol9Wo+smKal2sHF6kM6q7qbE5tY03d7SHR6ygiuvwY1txkzIlPaD3NQ4Zryk/PCP1wKibBlI97dq+idXUxqgcEkVnruS/smRpuWaCbrHU5pc/wyTQsata0U77wVBTlRP9UNkT9oE61K9AHL9VERbeTVurMjNm54mqrFw8CwKmWBfpf6V2Dx/TdxN3YjMf2JwIEZ8JnjnEbEjvLAQZ1EKlxkciJ9UcdD1Z5ztDmgsgPIrMkWtMgfd41xOYXZOIjUcLB3tdchypHWIgb5k2gH0nE0zMHjRCRTLWxgY/VQrDuybcAQ/DDEwmwEn8COlSDBcTUE0GXcEjRzqoDDhDH7sfccg2szAt9hogjBFQFRmDyd9N1VTEFegXXKEVKQFJHEUd0DSKhLthIm0HSQpnNdCNizgq147GP0m7QTygNMye6NqM9ekwlG4kLI5I4cMZ+bVhMA8MwX1rw9oIjakAYX6jXlBRRJ4BF6PwmRSfQyLFhJwWy/IG8khKuirljODG0DfGAd3qCBNEol5vCqFAxqYLeUyB0H2A2Q0DspRD3BQfJEc5KBl6KprG6pNEPqqfkKzOQBsha2bQeVw6g3nSySaGYgb99ylhsLDLVYQ3E+oozOGHKzVbCBs+HkuUm6ivd4E0ZYeNTPTTrn51+0wA9TJgpZVLeaV1y+4yS8c64W0/AcFTBCHK/fFEMwFAmo4KRldE0ZxsF8cGbTuzYqHtOz8t6e8TMk5CcjNSC+kdcfgPyag9AoDhUQARmvAcIiAW3v0JzWJg64BJXdBQ21+/b4zwMqRW5dA2h3I7+onYJd+Y4i3FbyMxz4hxE7hS2MBdSq6Fgq6Bny/dxv6Sk76COj6Yz91ZG8dToQ7oYNCqu4QjX9FK5UoPt/PXO701mruhwcxGP2ecahzzxBtUtlzLHclsXtBA6wc+a2brlUc8TCvg5cPM7LiaOPT8Y4ub3bpAbqy+MQ18xRmvIe5nr83YXDt8Nca0/GveWniSHByybEVwx1dD1ccYB/6yF8DTaGcYLFA391o6DjjohaWfKXQ/xCWazmhPDhNbYf2WH4fse9zhRUkLwrXlUD+9iVD5HR77KWheclxkqsZ1bM+pqcWZ2xVe0zXjPb6pyO8IK1l5trcA7mLKuo48+VpQG0BuPmZeTbs9Vi+9oQyqv6Ieyou4FybU+HqRS4o+TH1VG7MvgFFjvfguwFfA4FobmCxcnTPAAAAAElFTkSuQmCC";
}
//data:image/png;base64,


  Generar() {
    let prompt = { prompt: this.promp, n: 1, size: this.medidas};
    this.RestService.get(
      'https://openai80.p.rapidapi.com/images/generations',
      prompt,
      this.RapidAPI,
      this.apiHost
    ).subscribe((resp:any) => {
      //this.decode64 = ("data:image/png;base64,"+ resp.result);
      this.firestoreService.ApiKeyAdd(this.RapidAPI);
      console.log(resp)
      this.response = resp;
    });
  }
  path:String | undefined
  file :any 
  nombreImg :String = ""

  publicarImg(){
    this.firestoreService.saveImgStorage(this.file, this.responseSableDifusion);
  }
  uploadImg($event:any){
    this.file = $event.target.files[0] 
    $event.target = null
  }
  descarga(){
    this.firestoreService.getImages()
  }
  
}
