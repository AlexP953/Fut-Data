// @ts-nocheck
import { Injectable,EventEmitter } from '@angular/core';
import { Player } from '../interfaces/interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class GetPlayersService {  
  user$ = new EventEmitter<Player>();
  players$ = new EventEmitter<Player[]>();
  constructor(public fbs: AngularFirestore) {}

  getPlayers() {
    this.players$ = this.fbs.collection("players").valueChanges();
  }

  getDataPlayer(id:string) {
    this.user$ = this.fbs.collection("players").doc(id).valueChanges();
    
  }

  generateRandomString = (num) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    let result = "";
      for (let i = 0; i < num; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

  createPlayer(plyr,newId){
    this.fbs.collection('players').doc(newId).set({
      id: newId,
      name: plyr.name,
      surname: plyr.surname,
      asistencias: 0,
      birth: plyr.birth,
      language: 'esp',
      games: 0,
      goals: 0,
      mail: plyr.mail,
      mobile: plyr.mobile,
      mvp: 0,
      isAdmin: false,
      image: null,
      mote: null,
    });
  }
   
  updatePlayer(player:Player, property:string){

    switch (property) {
      case 'goals':
        return this.fbs.collection("players").doc(`${player.code}`).update({
         goals: player.goals + 1
     })
       case 'asistencias':
         return this.fbs.collection("players").doc(`${player.code}`).update({
         asistencias: player.asistencias + 1
     })
    }
  }
}