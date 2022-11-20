import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { Player } from '../interfaces/interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../components/dialogs/dialogs.component';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public fbs: AngularFirestore,
    public getPlayersService: GetPlayersService,
    private router: Router,
    public dialog: MatDialog,
    public logError: ErrorService
  ) {}

  private hasSession: boolean = false;
  // TODO1
  // private hasSession: boolean = true; //CAMBIAR ESTO

  hide = true;
  user$ = new BehaviorSubject({});
  error$ = new Subject();
  user;
  player: Player | any;
  oldUser = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  check(): boolean {
    return this.hasSession;
  }

  login(userMail, userPass) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.hasSession = true;
        sessionStorage.setItem('hasSession', 'true');
        this.filterPlayer(userMail);
      })
      .catch((error) => {
        this.error$.next(error.code);
        this.logError.logError(error, userMail);
      });
  }

  openDialog(title, code) {
    this.dialog.open(DialogsComponent, {
      data: {
        title: title,
        error: code,
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('hasSession');
    this.hasSession = false;
    this.router.navigateByUrl('login');
    this.user$.next('');
  }

  filterPlayer(mail: string) {
    this.getPlayersService.getPlayers();
    this.getPlayersService.players$.subscribe((players) => {
      this.player = players.filter((e) => e.mail === mail);
      this.player[0].accessToken = this.user.accessToken;
      this.player[0].photoURL = this.user.photoURL;
      this.user$.next(this.player[0]);
      this.router.navigateByUrl('dashboard');
    });
  }
}
