import { Injectable } from '@angular/core';
import Replicate from 'replicate';


@Injectable({
  providedIn: 'root',
})

export class ReplicateService {
  constructor(
    private replicate: Replicate = new Replicate({
      auth: '553b574a414c15942269218e7741edc306711f18',
    })
  ) {}

  public replica() {
    const output = this.replicate
      .run(
        'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
        {
          input: {
            prompt: 'a vision of paradise. unreal engine',
          },
        }
      )
      .catch((e) => console.log(e));

    console.log(output);
   //return output;
  }
}
