import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetGamesService } from 'src/app/services/get-games.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
})
export class PartidosComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  players: Player[] = [];
  partidos: any;
  partido;

  constructor(
    public getPlayersService: GetPlayersService,
    private router: Router,
    public fbs: AngularFirestore,
    public getGamesServices: GetGamesService
  ) {}

  ngOnInit(): void {
    this.getPlayersService.getPlayers();
    this.getPlayersService.players$.subscribe((players) => {
      this.players = players;
    });
    this.getGamesServices.getGame();
    this.getGamesServices.games$.subscribe((partidos) => {
      this.partidos = partidos;
    });
  }

  navegar(id: number) {
    this.router.navigate(['detalle-partido', id]);
  }
}
