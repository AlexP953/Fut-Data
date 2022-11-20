import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { Player } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  futureId: number;
  hide = true;
  hasSession: boolean = sessionStorage.getItem('hasSession') ? false : true;

  constructor(
    public fbs: AngularFirestore,
    public getPlayersService: GetPlayersService,
    private router: Router,
    private auth: AuthService
  ) {}

  desktopDevice = false;
  errorCode: number;
  player: Player;
  oldUser = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });
  loading = false;

  ngOnInit(): void {
    if (window.innerWidth >= 1020) {
      console.log('no es valido');
      this.desktopDevice = true;
    }
  }

  login() {
    this.loading = true;
    this.auth.login(
      this.oldUser.value.user.toLowerCase(),
      this.oldUser.value.pass
    );
    this.auth.error$.subscribe((data) => {
      this.validatorsMessage(data);
    });
  }

  validatorsMessage(code) {
    this.loading = false;
    switch (code) {
      case 'auth/user-not-found':
        this.errorCode = 1;
        break;
      case 'auth/invalid-email':
        this.errorCode = 2;
        break;
      case 'auth/wrong-password':
        this.errorCode = 3;
        break;
      case 'auth/internal-error':
        this.auth.openDialog('Error interno', 'Contacte con el administrador.');
    }
  }
}
