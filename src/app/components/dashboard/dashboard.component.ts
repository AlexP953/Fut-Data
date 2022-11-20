import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Player } from 'src/app/interfaces/interface';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  player: Player | any;
  moreGoals: Player[];
  moreGames: Player[];

  constructor(
    public getPlayersService: GetPlayersService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlayersService.players$.subscribe((players) => {
      let filteredArrays = this.filterTop3(players);
      this.moreGames = filteredArrays.games;
      this.moreGoals = filteredArrays.goals;
    });
    this.authService.user$.subscribe((data) => {
      this.player = data;
      this.translate.use(this.player.language);
    });
  }

  navegar(playerCode: number) {
    this.router.navigate(['playerDetail', playerCode]);
  }

  filterTop3(array) {
    let filteredArrays = {
      goals: [],
      games: [],
    };
    filteredArrays.goals = array.sort(function (a, b) {
      if (a.goals < b.goals) {
        return 1;
      }
      if (a.goals > b.goals) {
        return -1;
      }
      return 0;
    });

    filteredArrays.games = array.sort(function (a, b) {
      if (a.games < b.games) {
        return 1;
      }
      if (a.games > b.games) {
        return -1;
      }
      return 0;
    });
    return filteredArrays;
  }

  // TODO 6
  // mssg(player:Player){
  //    this.fbs.collection("mails").add({
  //      to: `${player.mail}`,
  //      message: {
  //        subject: `Hola ${player.name}`,
  //        text: 'This is the plaintext section of the email body.',
  //        html: `<div><p>Estos son tus datos:</p>
  //        <p>name: ${player.name}</p>
  //        <p>surname: ${player.surname}</p>
  //        <p>mail: ${player.mail}</p>
  //        <p>Cantidad de goles: ${player.goals}</p>
  //        </div>`,
  //      }
  //    })
  //     .then((e) => {
  //       console.log('e',e);
  //     }
  //     );
  // }
}
