import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ErrorService } from '../../services/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss'],
})
export class RecoverPassComponent implements OnInit {
  constructor(
    public logError: ErrorService,
    private snackBar: MatSnackBar,
  ) {}

  response;
  textoDeInput;
  faArrowLeft = faArrowLeft;
  loading = false;

  ngOnInit(): void {
    // TODO 9
    console.log(window.navigator.language);
  }

  recover(email) {
    const auth = getAuth();
    this.loading = true;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        this.response = true;
        this.loading = false;

        this.snackBar.open(`Mensaje enviado correctamente a ${email}`, '', {
          duration: 3000,
          panelClass: ['style-okey'],
        });
      })
      .catch((error) => {
        this.loading = false;
        this.logError.logError(error, email);
        this.snackBar.open(`El correo está mal escrito o no existe`, '', {
          duration: 3000,
          panelClass: ['style-error'],
        });
      });
  }
}
