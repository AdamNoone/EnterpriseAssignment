import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import {Router} from '@angular/router';

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

  constructor(private pubService: PubService, public router: Router) { }

  ngOnInit() {
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

  refreshList() {
    this.retrievePubs();
    this.currentPub = null;
    this.currentIndex = -1;
  }

  setActivePubs(pub, index) {
    this.currentPub = pub;
    this.currentIndex = index;
    // this.router.navigate(['/pubs/$index']);
  }

  removeAllPubs() {
    this.currentPub.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrievePubs();
        },
        error => {
          console.log(error);
        });
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
}
