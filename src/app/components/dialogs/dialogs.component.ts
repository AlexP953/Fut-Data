import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string,
  error: string,
}


@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
})
export class DialogsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  title:string;
  errorCode:number;

  ngOnInit(): void {

    if (this.data.title === 'error-login') {
      this.title = 'Ha ocurrido un error al iniciar sesión';
    }

    switch (this.data.error) {
      case 'auth/user-not-found':
        this.errorCode = 1;
        break;
      case 'auth/invalid-email':
        this.errorCode = 2;
        break;
      case 'auth/wrong-password':
        this.errorCode = 3;
        break;
      default:
        this.errorCode = 0;
        break;
    }


  }
}
