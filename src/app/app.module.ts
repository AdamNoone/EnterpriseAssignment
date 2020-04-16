import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PubDetailsComponent } from './components/pub-details/pub-details.component';
import { PubFeedComponent } from './components/pub-feed/pub-feed.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {RouterModule} from '@angular/router';
import {PubService} from './services/pub.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PubDetailsComponent,
    PubFeedComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [PubService],
  bootstrap: [AppComponent]
})
export class AppModule { }





