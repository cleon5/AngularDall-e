import { Injectable, NgZone, inject } from '@angular/core';
import {
  Auth,
} from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { DocumentData, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref,  } from "firebase/storage";
import { Storage, uploadBytes, listAll, getDownloadURL,  } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  userData: any;
  imagenData: any;
  Imagenes: any;
  firestore: Firestore = inject(Firestore);
  constructor(private auth: Auth, firestore: Firestore, private storage: Storage) {
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }
  setImgData(img: any) {
    this.imagenData = {
      completed_at: img.completed_at,
      created_at: img.created_at,
      error: img.error,
      id: img.id,
      input: img.input,
      logs: img.logs,
      metrics: img.metrics,
      output: img.output,
      started_at: img.started_at,
      status: img.status,
      urls: img.urls,
      version: img.version,
      webhook_completed: img.webhook_completed,
    };
  }
  setUserData(user: any) {
    console.log(user);
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      //Imagenes: user.Imagenes,
    };
    return setDoc(doc(this.firestore, 'Users', user.uid), this.userData, {
      merge: true,
    });
  }
  saveUserOnly() {}
  ApiKeyAdd(apikey: string) {
    console.log(this.userData);
    updateDoc(doc(this.firestore, 'Users', this.userData.uid), {
      apyKey: apikey,
    });
  }
  TokenAdd(Token: string) {
    console.log(this.userData);
    updateDoc(doc(this.firestore, 'Users', this.userData.uid), {
      Token: Token,
    });
  }
  AgregarImagen(imagen: any) {
    console.log(imagen);
    //this.setImgData(imagen);
    this.ControladorImagenes(imagen.id);
    setDoc(doc(this.firestore, 'Imagenes', imagen.id), imagen)
  }
  AgregarImagenUser(arrImagenes: any) {
    console.log(this.userData);
    updateDoc(doc(this.firestore, 'Users', this.userData.uid), {
      Imagenes: arrImagenes,
    });
  }



  async getUser() {
    let docSnap = await getDoc(doc(this.firestore, 'Users', this.userData.uid));
    this.setUserData(docSnap.data());
    return docSnap.data();
  }
  user : any;
  async ControladorImagenes(ImagenId: string) {
    this.user = await this.getUser();
    this.Imagenes = this.user.Imagenes;
    if (this.Imagenes == undefined) {
      this.Imagenes = [ImagenId];
    } else {
      this.Imagenes.push(ImagenId);
    }

    console.log(this.Imagenes);
    this.AgregarImagenUser(this.Imagenes);
  }
  async GetAllImages(){
    const q = query(collection(this.firestore, "Imagenes"))
    const querySnapshot = await getDocs(q);
    let temDocArr: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      temDocArr.push(doc.data())
    });
    return temDocArr;
  }
  private basePath = '/uploads';

  saveImgStorage(fileUpload:any){
    console.log(fileUpload)
    const imgRef = ref(this.storage,`img/${fileUpload.name}`);
    uploadBytes(imgRef, fileUpload)
    .then(response => {
      console.log(response)
     //this.getImages();
    })
    .catch(error => console.log(error));
  }
  images:any = [];
  getImages() {
    
    const imagesRef = ref(this.storage, 'img');
    this.images=[]
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
        console.log(this.images)
      })
      .catch(error => console.log(error));
      console.log(this.images)
      return this.images;
  }
  downloadIMG(){
    getDownloadURL(ref(this.storage, 'img/3727094c-a37f-48b5-8f8a-8bb75db3b637-0.png'))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
  
      // Or inserted into an <img> element
      //const img = document.getElementById('myimg');
      //img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
    });
  }
}
