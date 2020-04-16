import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PubDetailsComponent } from './components/pub-details/pub-details.component';
import { PubFeedComponent } from './components/pub-feed/pub-feed.component';
import { HomeComponent } from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

