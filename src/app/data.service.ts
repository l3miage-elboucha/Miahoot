import { Injectable } from '@angular/core';
import { Auth, authState, user} from '@angular/fire/auth';
import { docData, Firestore, FirestoreDataConverter, getDoc, doc, setDoc} from '@angular/fire/firestore';
import { Observable, switchMap, of } from 'rxjs';
import { MiahootUser } from './miahootUser';

const userConverter: FirestoreDataConverter<MiahootUser> = {
  toFirestore: (MUser) => MUser,
  fromFirestore: (snap) => ({
    name: snap.get('name') ?? '',
    photoUrl: snap.get('photoUrl') ?? '',
  })
}


@Injectable({
  providedIn: 'root'
})

export class DataService {

  obsUserMiahoot: Observable<MiahootUser | undefined>;

  constructor(private auth: Auth, private frS: Firestore) { 
    this.obsUserMiahoot = authState(this.auth).pipe(
      switchMap((user) => {
        if(user == null) {
          return of(undefined)
        } else {
          const docId = `users/${user.uid}`
          const docUser = doc(frS, docId).withConverter(userConverter)
          
          return docData(docUser)
        }
      })
    )

    authState(this.auth).subscribe(async user => {
      if(user != null) {
        const docId = `users/${user.uid}`
        const docUser = doc(frS, docId).withConverter(userConverter)
        const snapUser = await getDoc(docUser)
        
        if(!snapUser.exists()) {
          setDoc(docUser, {
            name: user.displayName ?? user.email ?? user.uid,
            photoUrl: user.photoURL ?? ''
          })
        }

      }
    })
  }

}
