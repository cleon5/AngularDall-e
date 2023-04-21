import Replicate from "replicate";


export const asa = async () =>{
    const replicate = new Replicate({
        auth: "553b574a414c15942269218e7741edc306711f18",
      });
      
      const output = await replicate.run(
        "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
        {
          input: {
            prompt: "a vision of paradise. unreal engine"
          }
        }
      ).then(t => console.log(t))
      .catch(e => console.log(e));
      
      console.log(output)
}