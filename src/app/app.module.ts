import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GetPlayersService } from './services/get-players.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayersComponent } from './pages/players/players.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { PartidosComponent } from './pages/partidos/partidos.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material.module';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AgePipe } from './pipes/age.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecoverPassComponent } from './pages/recover-pass/recover-pass.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { DetailGamesComponent } from './pages/detail-games/detail-games.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    RegisterComponent,
    HeaderComponent,
    PlayerDetailComponent,
    PartidosComponent,
    ProfileComponent,
    EditProfileComponent,
    LoginComponent,
    DialogsComponent,
    AdminPanelComponent,
    AgePipe,
    RecoverPassComponent,
    ChangePassComponent,
    DetailGamesComponent,
    TerminosCondicionesComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [GetPlayersService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
