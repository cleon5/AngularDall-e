import { Injectable, NgZone, inject } from '@angular/core';
import {
  Auth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,signInWithRedirect ,
  authState,
} from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { FirestoreService } from '../../shared/services/firestore.service';
//import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  firestore: Firestore = inject(Firestore);
  constructor(
    private auth: Auth,
    firestore: Firestore,
    private firestoreService: FirestoreService
  ) {
    authState(this.auth).subscribe((user) => {
      console.log(user);
      if (user) {
        this.firestoreService.userData = user;
        localStorage.setItem(
          'user',
          JSON.stringify(this.firestoreService.userData)
        );
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  
  register(email: any, password: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  async login(email: any, password: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.firestoreService.setUserData(res);
      })
      .catch((err) => console.log(err));
  }
  async GoogleLogin() {
    try {
      const res = await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.firestoreService.setUserData(res.user);
      console.log(res);
    } catch (err) {
      return console.log(err);
    }
  }
  async GoogleLogin2() {
    try {
      const res = await signInWithRedirect(this.auth, new GoogleAuthProvider());
      this.firestoreService.setUserData(res);
      console.log(res);
    } catch (err) {
      return console.log(err);
    }
  }
  SignOut() {
    return signOut(this.auth);
  }

  /*actualizar(apikey:any){
    console.log(this.userData)
    updateDoc(doc(this.firestore, "Users", this.userData.uid), {
      apyKey2: apikey
    })
  }

  onAuthStateChanged(this.auth, (user)=>{
    console.log(user)
  } )*/
}
