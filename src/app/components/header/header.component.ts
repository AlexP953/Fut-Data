import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hasSession: boolean = sessionStorage.getItem('hasSession') ? false : true;
  menuMobileActive: boolean = false;
  player: Player | any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.player = data;
    });
  }

  changePage(destiny: string) {
    this.router.navigateByUrl(destiny);
    this.menuMobileActive = false;
  }

  logout(){
    this.authService.logout();
  }
}
