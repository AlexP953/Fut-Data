import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/interface';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { AuthService } from 'src/app/services/auth.service';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faTrophy = faTrophy;
  faFutbol = faFutbol;
  faStar = faStar;
  faArrowLeft = faArrowLeft;
  code: string;
  player: Player | any;

  constructor(
    public getPlayersService: GetPlayersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.player = data;
    });
  }
}
