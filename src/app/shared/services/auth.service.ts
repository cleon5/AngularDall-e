import { Injectable, NgZone, inject } from '@angular/core';
import {
  Auth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  authState
} from '@angular/fire/auth';
import { Firestore, collectionData, collection, addDoc, updateDoc} from '@angular/fire/firestore';
import { doc, setDoc} from "firebase/firestore";
//import { AngularFirestore } from '@angular/fire/compat/firestore'
import {User} from './user'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  firestore: Firestore = inject(Firestore);
  constructor(private auth: Auth, firestore: Firestore,) {
    authState(this.auth).subscribe(user=> {
      console.log(user)
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }
  setUserData(user: any) {
    console.log(user)
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      apyKey:'apikey'
    };
    return setDoc(doc(this.firestore, "Users", user.uid), this.userData)
   
  }
  register(email: any, password: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      /*.then(res =>{
        this.setUserData(res.user)
      });/*/
  }
  login(email: any, password: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(res =>{
      this.setUserData(res)
    }).catch(err=> console.log(err))
  }
  GoogleLogin() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then(res =>{
      this.setUserData(res.user)
      console.log(res)
    }).catch(err=> console.log(err))
  }
  SignOut(){
    return signOut(this.auth) 
  }
  getDataUser(){
    
  }

  agregarImagen(urlImagen:string){

  }
  actualizar(apikey:any){
    console.log(this.userData)
    updateDoc(doc(this.firestore, "Users", this.userData.uid), {
      apyKey2: apikey
    })
  }
  /*
  onAuthStateChanged(this.auth, (user)=>{
    console.log(user)
  } )*/
  
}
