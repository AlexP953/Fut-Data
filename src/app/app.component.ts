import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'football2';
  logoActive = true;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('esp');
    translate.use('esp');
    setTimeout(() => {
      this.logoActive = false;
    }, 5000);
  }
}
