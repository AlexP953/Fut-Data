import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { matchValidator } from 'src/app/services/form-validators.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from '../../services/error.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  futureId: number;
  hide = true;
  mailsRight = true;
  passwordRight = true;
  faArrowLeft = faArrowLeft;
  loading = false;

  constructor(
    public datepipe: DatePipe,
    public getPlayersService: GetPlayersService,
    private snackBar: MatSnackBar,
    private router: Router,
    public logError: ErrorService
  ) {}

  newPlayer = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      matchValidator('password', false),
    ]),
    mail: new FormControl('', [Validators.required, Validators.email]),

    mobile: new FormControl('', [Validators.required, Validators.minLength(9)]),
    invitation: new FormControl('', [Validators.required]),
    terms: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.getPlayersService.getPlayers();
    this.getPlayersService.players$.subscribe((players) => {
      this.futureId = players.length;
    });
  }

  createPlayer() {
    // TODO2 Cambiar invitación
    if (this.newPlayer.status === 'VALID') {
      if (this.newPlayer.value.invitation.toUpperCase() === 'HOLA') {
        const auth = getAuth();
        this.loading = true;
        createUserWithEmailAndPassword(
          auth,
          this.newPlayer.value.mail,
          this.newPlayer.value.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user);
            let futurePlayer = this.newPlayer.value;
            futurePlayer.birth = this.datepipe.transform(
              this.newPlayer.value.birth,
              'dd-MM-yyyy'
            );
            this.getPlayersService.players$.subscribe((players) => {
              let player = players.filter(
                (e) => e.mail === this.newPlayer.value.mail
              );
              let playerExist = player[0];
              if (playerExist) {
                console.log('existe, se vincula la cuenta');
              } else {
                console.log('no existe, se crea la cuenta');
                this.getPlayersService.createPlayer(
                  this.newPlayer.value,
                  this.futureId.toString()
                );
              }
            });
            this.loading = false;
            this.openSnackbar('Cuenta creada con éxito!');
            this.router.navigateByUrl('dashboard');
          })
          .catch((err) => {
            console.log('error', err);
            this.loading = false;
            this.openSnackbar('El email ya está en uso');
            this.logError.logError(err, this.newPlayer.value.mail);
          });
      } else {
        this.loading = false;
        this.openSnackbar('No es una invitacion valida');
      }
    } else {
      this.loading = false;
      this.openSnackbar('Falta información');
      if (
        this.newPlayer.value.password !== this.newPlayer.value.confirmPassword
      ) {
        this.passwordRight = false;
      } else {
        this.passwordRight = true;
      }
    }
  }

  openSnackbar(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
