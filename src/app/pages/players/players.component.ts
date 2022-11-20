// @ts-nocheck
import { Component, OnInit, ViewChild} from '@angular/core';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { Player } from '../../interfaces/interface';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  filterSelected;
  faArrowLeft = faArrowLeft;

  constructor(
    public getPlayersService: GetPlayersService,
    private router: Router
  ) {}
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getPlayersService.getPlayers();
    this.getPlayersService.players$.subscribe((players) => {
      this.players = players.sort(function (a, b) {
        if (a.goals < b.goals) {
          return 1;
        }
        if (a.goals > b.goals) {
          return -1;
        }
        return 0;
      });
      this.dataSource = new MatTableDataSource(this.players);
      this.dataSource.sort = this.sort;
    });
  }

  sortList(criterio) {
    if (this.filterSelected === criterio) {
      this.players = this.players.reverse();
    } else {
      switch (criterio) {
        case 'jugadores':
          this.players = this.players.sort(function (a, b) {
            if (a.mote < b.mote) {
              return 1;
            }
            if (a.mote > b.mote) {
              return -1;
            }
            return 0;
          });
          break;

        case 'partidos':
          this.players = this.players.sort(function (a, b) {
            if (a.games < b.games) {
              return 1;
            }
            if (a.games > b.games) {
              return -1;
            }
            return 0;
          });
          break;

        case 'goles':
          this.players = this.players.sort(function (a, b) {
            if (a.goals < b.goals) {
              return 1;
            }
            if (a.goals > b.goals) {
              return -1;
            }
            return 0;
          });
          break;

        case 'mvp':
          this.players = this.players.sort(function (a, b) {
            if (a.mvp < b.mvp) {
              return 1;
            }
            if (a.mvp > b.mvp) {
              return -1;
            }
            return 0;
          });
          break;
      }
    }
    this.filterSelected = criterio;
  }

  updatePlyr(player: Player, property: string) {
    this.getPlayersService.updatePlayer(player, property);
  }

  navegar(playerCode: number) {
    this.router.navigate(['playerDetail', playerCode]);
  }
}
