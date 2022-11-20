import { Component, OnInit } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth';
import { ErrorService } from '../../services/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  constructor(
    public logError: ErrorService,
    private snackBar: MatSnackBar,
    public auth: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {}
  response;
  oldPass;
  newPass;
  hide1 = true;
  hide2 = true;
  faArrowLeft = faArrowLeft;
  loading = false;

  ngOnInit(): void {
  }

  change(oldPass, newPass) {
    const gAuth = getAuth();
    this.loading = true;

    signInWithEmailAndPassword(gAuth, gAuth.currentUser.email, oldPass)
      .then(() => {
        updatePassword(gAuth.currentUser, newPass)
          .then(() => {
            this.loading = false;
            this.snackBar.open(`All right!`, '', {
              duration: 3000,
              panelClass: ['style-okey'],
            });
            setTimeout(() => {
              this.router.navigateByUrl('dashboard');
            }, 3500);
          })
          .catch((error) => {
            this.logError.logError(error, gAuth.currentUser.email);
            this.snackBar.open(
              this.translate.instant('error_admin'),
              '',
              {
                duration: 3000,
                panelClass: ['style-error'],
              }
            );
          });
      })
      .catch((error) => {
        this.loading = false;
        this.logError.logError(error, gAuth.currentUser.email);
        this.snackBar.open(
          this.translate.instant('error_old_pass'),
          '',
          {
            duration: 3000,
            panelClass: ['style-error'],
          }
        );
      });
  }
}
