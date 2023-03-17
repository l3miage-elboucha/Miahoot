import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Auth, User, authState, signOut } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<User | null>;
  public bsIsAuthentified = new BehaviorSubject<boolean>( false );
  public showDropdown : boolean = false;

  constructor(private auth: Auth, private userData: DataService) {
      this.user = authState(this.auth);
  }

  show(){
    this.showDropdown = !this.showDropdown;
  }

  async login() {
    this.bsIsAuthentified.next(true);
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch (err) { 
      console.error("We killed the popup login")
    }
    this.bsIsAuthentified.next(false);
  }

  async logout() {
    return signOut(this.auth);
  }
}
