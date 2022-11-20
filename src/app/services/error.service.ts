import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(public fbs: AngularFirestore) {}

  f = new Date();
  today = `${this.f.getDate()}-${this.f.getMonth()}-${this.f.getFullYear()} | ${this.f.getHours()}:${this.f.getMinutes()}`;

  logError(error, userMail) {
    this.fbs.collection('errors').doc(this.today).set({
      code: error.code,
      message: error.message,
      user: userMail,
    });
  }
}
