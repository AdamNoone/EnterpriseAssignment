// This components .html and .ts have functionality inspired by a tutorial by bezkoder
// This Components code contains some minor elements of this tutorial that have been adapted for this project
// The tutorial can be accessed at https://bezkoder.com/angular-crud-app/#Add_new_Item_Component


import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-pub-feed',
  templateUrl: './pub-feed.component.html',
  styleUrls: ['./pub-feed.component.css']
})
export class PubFeedComponent implements OnInit {
  pubs: any;
  currentPub = null;
  currentIndex = -1;
  name = '';
  showAdminBoard = false;
  private roles: string[];
  isLoggedIn = false;

  constructor(private pubService: PubService, public router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    }

    this.retrievePubs();
  }

  retrievePubs() {
    this.pubService.getAll()
      .subscribe(
        data => {
          this.pubs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  setActivePubs(pub, index) {
    this.currentPub = pub;
    this.currentIndex = index;
    // this.router.navigate(['/pubs/$index']);
  }

  searchTitle() {
    this.pubService.findByTitle(this.name)
      .subscribe(
        data => {
          this.pubs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deletePub(pubid) {
    this.pubService.delete(pubid)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/pubs']);
        },
        error => {
          console.log(error);
        });
  }

  resetList() {
    // tslint:disable-next-line:triple-equals
    if (this.name == '') {
      this.retrievePubs();
    }
  }

}
