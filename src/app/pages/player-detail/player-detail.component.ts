import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  faTrophy = faTrophy;
  faFutbol = faFutbol;
  faStar = faStar;
  code: string;
  player: Player;
  faArrowLeft = faArrowLeft;

  constructor(
    private router: Router,
    public getPlayersService: GetPlayersService,
    public fbs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.code = this.router.url.split('/')[2];
    this.getPlayersService.getDataPlayer(this.code);
    this.getPlayersService.user$.subscribe((user) => {
      this.player = user;
    });
  }
}
