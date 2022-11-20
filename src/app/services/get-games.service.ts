// @ts-nocheck
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GetGamesService {
  constructor(public fbs: AngularFirestore) {}

  games$ = new EventEmitter();
  dataGame$ = new EventEmitter<Player>();

  getGame() {
    this.games$ = this.fbs.collection('partidos').valueChanges();
  }

  getDataGame(id: string) {
    this.dataGame$ = this.fbs.collection('partidos').doc(id).valueChanges();
  }
}
