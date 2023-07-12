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
  user : any;
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
  ApiKeyAdd(apikey: string) {
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
    this.ControladorImagenes(imagen.id);
    setDoc(doc(this.firestore, 'Imagenes', imagen.id), imagen)
  }
  AgregarImagenUser(arrImagenes: any) {
    updateDoc(doc(this.firestore, 'Users', this.userData.uid), {
      Imagenes: arrImagenes,
    });
  }

  async getUser() {
    let docSnap = await getDoc(doc(this.firestore, 'Users', this.userData.uid));
    this.setUserData(docSnap.data());
    return docSnap.data();
  }
  
  async ControladorImagenes(ImagenId: string) {
    this.user = await this.getUser();
    this.Imagenes = this.user.Imagenes;
    if (this.Imagenes == undefined) {
      this.Imagenes = [ImagenId];
    } else {
      this.Imagenes.push(ImagenId);
    }

    this.AgregarImagenUser(this.Imagenes);
  }

  async GetAllImages(){
    const q = query(collection(this.firestore, "Imagenes"))
    const querySnapshot = await getDocs(q);
    let temDocArr: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      temDocArr.push(doc.data())
    });
    return temDocArr;
  }

  saveImgStorage(fileUpload:any, imagen:any){
    console.log(fileUpload)
    const imgRef = ref(this.storage,`img/${imagen.id}`);
    this.AgregarImagen(imagen)
    
    uploadBytes(imgRef, fileUpload)
    .then(response => {//fullPath
      console.log(response)
     //this.getImages();
    })
    .catch(error => console.log(error));
  }
  images:any = [];

  async getImage(id:String){
    const pathReference = ref(this.storage, `img/${id}`);
    const url = await getDownloadURL(pathReference).then((data) => {
      return data;
    })
    return url
  }
  getImages() {
    //const pathReference = ref(this.storage, 'img/4baxhmzbg5kuxvg3dcslqz63pa');

    const imagesRef = ref(this.storage, 'img');
    this.images=[]
    listAll(imagesRef)
      .then(async response => {
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
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
    })
    .catch((error) => {
      // Handle any errors
    });
  }
}
