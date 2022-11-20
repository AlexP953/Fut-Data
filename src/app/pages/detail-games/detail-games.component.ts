import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faTransgender } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { GetGamesService } from 'src/app/services/get-games.service';

@Component({
  selector: 'app-detail-games',
  templateUrl: './detail-games.component.html',
  styleUrls: ['./detail-games.component.scss'],
})
export class DetailGamesComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faFutbol = faFutbol;
  faCalendar = faCalendar;
  faClock = faClock;
  faTransgender = faTransgender;
  faMapMarker = faMapMarker;
  players: Player[] = [];
  game: any;
  id: string;

  constructor(
    public getPlayersService: GetPlayersService,
    public getGameService: GetGamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.router.url.split('/')[2];
    this.getGameService.getDataGame(this.id);
    this.getGameService.dataGame$.subscribe((detailGame) => {
      this.game = detailGame;
    });

    this.getPlayersService.getPlayers();
    this.getPlayersService.players$.subscribe((players) => {
      this.players = players;
    });
  }

  navegar(playerCode: number) {
    this.router.navigate(['playerDetail', playerCode]);
  }
}
