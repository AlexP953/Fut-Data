import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { DetailGamesComponent } from './pages/detail-games/detail-games.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { PartidosComponent } from './pages/partidos/partidos.component';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';
import { PlayersComponent } from './pages/players/players.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoverPassComponent } from './pages/recover-pass/recover-pass.component';
import { RegisterComponent } from './pages/register/register.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuardGuard],
    component: DashboardComponent,
  },
  {
    path: 'players',
    canActivate: [AuthGuardGuard],
    component: PlayersComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'playerDetail/:code',
    canActivate: [AuthGuardGuard],
    component: PlayerDetailComponent,
  },
  {
    path: 'partidos',
    canActivate: [AuthGuardGuard],
    component: PartidosComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuardGuard],
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
  },
  {
    path: 'recover-pass',
    component: RecoverPassComponent,
  },
  {
    path: 'change-pass',
    component: ChangePassComponent,
  },
  {
    path: 'detalle-partido/:code',
    component: DetailGamesComponent,
  },
  {
    path: 'terminos-condiciones',
    component: TerminosCondicionesComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
