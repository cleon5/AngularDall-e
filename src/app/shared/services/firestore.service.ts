import { Injectable, NgZone, inject } from '@angular/core';
import {
  Auth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  authState,
} from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
  getDoc
} from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  userData: any;
  firestore: Firestore = inject(Firestore);
  constructor(private auth: Auth, firestore: Firestore) {
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }
  setUserData(user: any) {
    console.log(user);
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return setDoc(doc(this.firestore, 'Users', user.uid), this.userData, { merge: true })
  }
  actualizar(apikey: any) {
    console.log(this.userData);
    updateDoc(doc(this.firestore, 'Users', this.userData.uid), {
      apyKey: apikey,
    });
  }
  async getUser() {
    let docSnap = await getDoc(doc(this.firestore, 'Users', this.userData.uid));
    return (docSnap.data())
  }
}
