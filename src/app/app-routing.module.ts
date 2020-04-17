import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PubDetailsComponent } from './components/pub-details/pub-details.component';
import { PubFeedComponent } from './components/pub-feed/pub-feed.component';
import { HomeComponent } from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: 'pubs',
    component: PubFeedComponent
  },
  { path: 'pubs/:id',
    component: PubDetailsComponent
  },
  { path: 'profile',
    component: ProfileComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  { path: 'user',
    component: BoardUserComponent
  },
  { path: 'mod',
    component: BoardModeratorComponent
  },
  { path: 'admin',
    component: BoardAdminComponent
  },
  { path: 'map',
    component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

