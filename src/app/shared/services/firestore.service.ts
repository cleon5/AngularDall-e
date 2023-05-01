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

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  userData: any;
  imagenData: any;
  Imagenes: any;
  firestore: Firestore = inject(Firestore);
  constructor(private auth: Auth, firestore: Firestore) {
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
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      temDocArr.push(doc.data())
    });
    return temDocArr;
  }
}
